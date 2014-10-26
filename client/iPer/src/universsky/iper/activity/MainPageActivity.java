package universsky.iper.activity;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

import universsky.iper.R;
import universsky.iper.config.Const;
import universsky.iper.service.iPerService;
import universsky.iper.utils.ProcessInfo;
import universsky.iper.utils.Programe;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.CompoundButton.OnCheckedChangeListener;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

public class MainPageActivity extends Activity {

	public static final String SETTINGS_PROPERTIES = "\\iPerSettings.properties";

	private static final String LOG_TAG = "iPer-"
			+ MainPageActivity.class.getSimpleName();

	private static final int TIMEOUT = 20000;

	private List<Programe> processList;
	private ProcessInfo processInfo;
	private Intent monitorService;
	private ListView lstViProgramme;
	private Button btnTest;
	private boolean isRadioChecked = false;
	private int pid, uid;
	private String processName, packageName, settingTempFile;
	private boolean isServiceStop = false;
	private UpdateReceiver receiver;
	private Button btnOpenReport;
	private Button btnUploadCsv;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		Log.i(LOG_TAG, "MainActivity::onCreate");
		super.onCreate(savedInstanceState);
		setContentView(R.layout.mainpage);
		// create new file to save setting data
		makeFile();

		processInfo = new ProcessInfo();
		lstViProgramme = (ListView) findViewById(R.id.processList);
		// start test
		btnTest = (Button) findViewById(R.id.test);
		btnTest.setOnClickListener(new OnClickListener() {
			@SuppressLint("SimpleDateFormat")
			@Override
			public void onClick(View v) {

				monitorService = new Intent();
				monitorService.setClass(MainPageActivity.this,
						iPerService.class);
				if ("开始测试".equals(btnTest.getText().toString())) {
					if (isRadioChecked) {
						Intent intent = getPackageManager()
								.getLaunchIntentForPackage(packageName);
						String startActivity = "";
						Log.d(LOG_TAG, packageName);
						// clear logcat
						try {
							Runtime.getRuntime().exec("logcat -c");
						} catch (IOException e) {
							Log.d(LOG_TAG, e.getMessage());
						}
						try {
							startActivity = intent.resolveActivity(
									getPackageManager()).getShortClassName();
							startActivity(intent);
						} catch (Exception e) {
							Toast.makeText(MainPageActivity.this, "该程序无法启动",
									Toast.LENGTH_LONG).show();
							return;
						}
						waitForAppStart(packageName);
						monitorService
								.putExtra(Const.PROCESS_NAME, processName);
						monitorService.putExtra(Const.PID, pid);
						monitorService.putExtra(Const.UID, uid);
						monitorService
								.putExtra(Const.PACKAGE_NAME, packageName);
						monitorService.putExtra(Const.SETTING_TEMP_FILE,
								settingTempFile);
						monitorService.putExtra(Const.START_ACTIVITY,
								startActivity);
						startService(monitorService);
						btnTest.setText("停止测试");
					} else {
						Toast.makeText(MainPageActivity.this, "请选择需要测试的应用程序",
								Toast.LENGTH_LONG).show();
					}
				} else {
					btnTest.setText("开始测试");
					Toast.makeText(MainPageActivity.this,
							"测试结果文件：" + Const.RESULT_FILE_PATH,
							Toast.LENGTH_LONG).show();
					stopService(monitorService);
				}
			}
		});

		// open report
		btnOpenReport = (Button) findViewById(R.id.open_report);

		Properties properties = new Properties();
		try {
			properties.load(new FileInputStream(settingTempFile));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		final String uploadServerIP = properties
				.getProperty(Const.UPLOAD_SERVER_IP);

		btnOpenReport.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				Intent intent = new Intent();
				intent.setAction("android.intent.action.VIEW");
				String reportUrl = "http://" + uploadServerIP
						+ "/perf.html?run_stamp=" + Const.RUN_STAMP;
				Uri url = Uri.parse(reportUrl);
				intent.setData(url);
				startActivity(intent);
			}
		});

		lstViProgramme.setAdapter(new ListAdapter());
	}

	public class UpdateReceiver extends BroadcastReceiver {

		@Override
		public void onReceive(Context context, Intent intent) {
			isServiceStop = intent.getExtras().getBoolean("isServiceStop");
			if (isServiceStop) {
				btnTest.setText("开始测试");
			}
		}
	}

	@Override
	protected void onStart() {
		Log.d(LOG_TAG, "onStart");
		receiver = new UpdateReceiver();
		IntentFilter filter = new IntentFilter();
		filter.addAction(Const.IPER_SERVICE_NAME);
		this.registerReceiver(receiver, filter);
		super.onStart();
	}

	@Override
	public void onResume() {
		super.onResume();
		Log.d(LOG_TAG, "onResume");
		if (iPerService.isStop) {
			btnTest.setText("开始测试");
		}
	}

	/**
	 * create new file to save setting data
	 */
	private void makeFile() {
		Log.i(LOG_TAG, "create new file to save setting data");
		settingTempFile = getBaseContext().getFilesDir().getPath()
				+ SETTINGS_PROPERTIES;
		Log.i(LOG_TAG, "settingFile = " + settingTempFile);
		File settingFile = new File(settingTempFile);
		if (!settingFile.exists()) {
			try {
				settingFile.createNewFile();
				Properties properties = new Properties();
				properties.setProperty(Const.INTERVAL, "5");
				properties.setProperty(Const.ISFLOAT, "true");
				properties.setProperty(Const.SENDER, "universsky@126.com");
				properties.setProperty(Const.PASSWORD, "15850537705163");
				properties.setProperty(Const.RECIPIENTS,
						"universsky@163.com 706812559@qq.com");
				properties.setProperty(Const.SMTP, "smtp.126.com");
				properties
						.setProperty(Const.UPLOAD_SERVER_IP, "10.240.154.117");

				FileOutputStream fos = new FileOutputStream(settingTempFile);
				properties.store(fos, "Setting Data");
				fos.close();
			} catch (IOException e) {
				Log.d(LOG_TAG, "create new file exception :" + e.getMessage());
			}
		}
	}

	private void waitForAppStart(String packageName) {
		Log.d(LOG_TAG, "wait for app start");
		boolean isProcessStarted = false;
		long startTime = System.currentTimeMillis();
		while (System.currentTimeMillis() < startTime + TIMEOUT) {
			processList = processInfo.getRunningProcess(getBaseContext());
			for (Programe programe : processList) {
				if ((programe.getPackageName() != null)
						&& (programe.getPackageName().equals(packageName))) {
					pid = programe.getPid();
					Log.d(LOG_TAG, "pid:" + pid);
					uid = programe.getUid();
					if (pid != 0) {
						isProcessStarted = true;
						break;
					}
				}
			}
			if (isProcessStarted) {
				break;
			}
		}
	}

	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK && event.getRepeatCount() == 0) {
			showDialog(0);
		}
		return super.onKeyDown(keyCode, event);
	}

	public boolean onCreateOptionsMenu(Menu menu) {
		menu.add(0, Menu.FIRST, 0, "退出").setIcon(
				android.R.drawable.ic_menu_delete);
		menu.add(0, Menu.FIRST, 1, "设置").setIcon(
				android.R.drawable.ic_menu_directions);
		return true;
	}

	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getOrder()) {
		case 0:
			showDialog(0);
			break;
		case 1:
			Intent intent = new Intent();
			intent.setClass(MainPageActivity.this, SettingsActivity.class);
			intent.putExtra(Const.SETTING_TEMP_FILE, settingTempFile);
			startActivityForResult(intent, Activity.RESULT_FIRST_USER);
			break;
		default:
			break;
		}
		return false;
	}

	protected Dialog onCreateDialog(int id) {
		switch (id) {
		case 0:
			return new AlertDialog.Builder(this)
					.setTitle("确定退出程序？")
					.setPositiveButton(
							"确定",
							new android.content.DialogInterface.OnClickListener() {
								@Override
								public void onClick(DialogInterface dialog,
										int which) {
									if (monitorService != null) {
										Log.d(LOG_TAG, "stop service");
										stopService(monitorService);
									}
									Log.d(LOG_TAG, "exit iPer");
									iPerService.closeOpenedStream();
									finish();
									System.exit(0);
								}
							}).setNegativeButton("取消", null).create();
		default:
			return null;
		}
	}

	private class ListAdapter extends BaseAdapter {
		List<Programe> programe;
		int tempPosition = -1;

		class Viewholder {
			TextView txtAppName;
			ImageView imgViAppIcon;
			RadioButton rdoBtnApp;
		}

		public ListAdapter() {
			programe = processInfo.getRunningProcess(getBaseContext());
		}

		@Override
		public int getCount() {
			return programe.size();
		}

		@Override
		public Object getItem(int position) {
			return programe.get(position);
		}

		@Override
		public long getItemId(int position) {
			return position;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			Viewholder holder = new Viewholder();
			final int i = position;
			convertView = MainPageActivity.this.getLayoutInflater().inflate(
					R.layout.list_item, null);
			holder.imgViAppIcon = (ImageView) convertView
					.findViewById(R.id.image);
			holder.txtAppName = (TextView) convertView.findViewById(R.id.text);
			holder.rdoBtnApp = (RadioButton) convertView.findViewById(R.id.rb);
			holder.rdoBtnApp.setId(position);
			holder.rdoBtnApp
					.setOnCheckedChangeListener(new OnCheckedChangeListener() {
						@Override
						public void onCheckedChanged(CompoundButton buttonView,
								boolean isChecked) {
							if (isChecked) {
								isRadioChecked = true;
								// Radio function
								if (tempPosition != -1) {
									RadioButton tempButton = (RadioButton) findViewById(tempPosition);
									if ((tempButton != null)
											&& (tempPosition != i)) {
										tempButton.setChecked(false);
									}
								}

								tempPosition = buttonView.getId();
								packageName = programe.get(tempPosition)
										.getPackageName();
								processName = programe.get(tempPosition)
										.getProcessName();
							}
						}
					});
			if (tempPosition == position) {
				if (!holder.rdoBtnApp.isChecked())
					holder.rdoBtnApp.setChecked(true);
			}
			Programe pr = (Programe) programe.get(position);
			holder.imgViAppIcon.setImageDrawable(pr.getIcon());
			holder.txtAppName.setText(pr.getProcessName());
			return convertView;
		}
	}

	@Override
	public void finish() {
		super.finish();
	}

	protected void onStop() {
		unregisterReceiver(receiver);
		super.onStop();
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
	}
}
