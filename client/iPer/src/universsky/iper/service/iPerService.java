package universsky.iper.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Properties;

import universsky.iper.R;
import universsky.iper.activity.MainPageActivity;
import universsky.iper.config.Const;
import universsky.iper.utils.CpuInfo;
import universsky.iper.utils.CurrentInfo;
import universsky.iper.utils.EncryptData;
import universsky.iper.utils.FileUpload;
import universsky.iper.utils.MailSender;
import universsky.iper.utils.MemoryInfo;
import universsky.iper.utils.MyApplication;

import android.app.Activity;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.net.wifi.WifiManager;
import android.os.BatteryManager;
import android.os.Handler;
import android.os.IBinder;
import android.support.v4.app.NotificationCompat;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnTouchListener;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class iPerService extends Service {

	private final static String LOG_TAG = "iPer-"
			+ iPerService.class.getSimpleName();

	private WindowManager windowManager = null;
	private WindowManager.LayoutParams wmParams = null;
	private View viFloatingWindow;
	private float mTouchStartX;
	private float mTouchStartY;
	private float startX;
	private float startY;
	private float x;
	private float y;
	private TextView txtTotalMem;
	private TextView txtUnusedMem;
	private TextView txtTraffic;
	private Button btnStop;
	private Button btnWifi;
	private int delaytime;
	private DecimalFormat fomart;
	private MemoryInfo memoryInfo;
	private WifiManager wifiManager;
	private Handler handler = new Handler();
	private CpuInfo cpuInfo;
	private String time;
	private boolean isFloating;
	private String processName, packageName, settingTempFile, startActivity;
	private int pid, uid;
	private boolean isServiceStop = false;
	private String sender, password, recipients, smtp, uploadServerIP;
	private String[] receivers;
	private EncryptData des;

	public static BufferedWriter bw;
	public static FileOutputStream out;
	public static OutputStreamWriter osw;
	public static boolean isStop = false;

	private String totalBatt;
	private String temperature;
	private String voltage;
	private CurrentInfo currentInfo;
	private BatteryInfoBroadcastReceiver batteryBroadcast = null;

	// get start time
	private static final int MAX_START_TIME_COUNT = 5;
	private static final String START_TIME = "#startTime";
	private int getStartTimeCount = 0;
	private boolean isGetStartTime = true;
	private String startTime = "";

	@Override
	public void onCreate() {
		Log.i(LOG_TAG, "onCreate");
		super.onCreate();
		isServiceStop = false;
		isStop = false;
		memoryInfo = new MemoryInfo();
		fomart = new DecimalFormat();
		fomart.setMaximumFractionDigits(2);
		fomart.setMinimumFractionDigits(0);
		des = new EncryptData(Const.PASSWORD_ENCYPT_KEY);
		currentInfo = new CurrentInfo();
		batteryBroadcast = new BatteryInfoBroadcastReceiver();
		registerReceiver(batteryBroadcast, new IntentFilter(
				"android.intent.action.BATTERY_CHANGED"));
	}

	public class BatteryInfoBroadcastReceiver extends BroadcastReceiver {

		@Override
		public void onReceive(Context context, Intent intent) {

			if (Intent.ACTION_BATTERY_CHANGED.equals(intent.getAction())) {
				int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, 0);

				int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
				totalBatt = String.valueOf(level * 100 / scale) + "%";

				voltage = String.valueOf(intent.getIntExtra(
						BatteryManager.EXTRA_VOLTAGE, -1) * 1.0 / 1000);

				temperature = String.valueOf(intent.getIntExtra(
						BatteryManager.EXTRA_TEMPERATURE, -1) * 1.0 / 10);
			}

		}

	}

	@Override
	public void onStart(Intent intent, int startId) {
		Log.i(LOG_TAG, "onStart");
		PendingIntent contentIntent = PendingIntent.getActivity(
				getBaseContext(), 0, new Intent(this, MainPageActivity.class),
				0);
		NotificationCompat.Builder builder = new NotificationCompat.Builder(
				this);
		builder.setContentIntent(contentIntent).setSmallIcon(R.drawable.icon)
				.setWhen(System.currentTimeMillis()).setAutoCancel(true)
				.setContentTitle(Const.NOTIFICATION_TITLE)
				.setContentText(Const.NOTIFICATION_TEXT);

		startForeground(startId, builder.build());

		pid = intent.getExtras().getInt(Const.PID);
		uid = intent.getExtras().getInt(Const.UID);
		processName = intent.getExtras().getString(Const.PROCESS_NAME);
		packageName = intent.getExtras().getString(Const.PACKAGE_NAME);
		settingTempFile = intent.getExtras().getString(Const.SETTING_TEMP_FILE);
		startActivity = intent.getExtras().getString(Const.START_ACTIVITY);

		cpuInfo = new CpuInfo(getBaseContext(), pid, Integer.toString(uid));
		readSettingInfo(intent);
		delaytime = Integer.parseInt(time) * 1000;
		if (isFloating) {
			viFloatingWindow = LayoutInflater.from(this).inflate(
					R.layout.floating, null);
			txtUnusedMem = (TextView) viFloatingWindow
					.findViewById(R.id.memunused);
			txtTotalMem = (TextView) viFloatingWindow
					.findViewById(R.id.memtotal);
			txtTraffic = (TextView) viFloatingWindow.findViewById(R.id.traffic);
			btnWifi = (Button) viFloatingWindow.findViewById(R.id.wifi);

			wifiManager = (WifiManager) getSystemService(Context.WIFI_SERVICE);
			if (wifiManager.isWifiEnabled()) {
				btnWifi.setText(R.string.closewifi);
			} else {
				btnWifi.setText(R.string.openwifi);
			}
			txtUnusedMem.setText("计算中,请稍后...");
			txtUnusedMem.setTextColor(android.graphics.Color.GREEN);
			txtTotalMem.setTextColor(android.graphics.Color.BLUE);
			txtTraffic.setTextColor(android.graphics.Color.RED);
			btnStop = (Button) viFloatingWindow.findViewById(R.id.stop);
			btnStop.setOnClickListener(new OnClickListener() {
				@Override
				public void onClick(View v) {
					Intent intent = new Intent();
					intent.putExtra(Const.IS_SERVICE_STOP, true);
					intent.setAction(Const.IPER_SERVICE_NAME);
					sendBroadcast(intent);
					// isServiceStop = true;
					Toast.makeText(iPerService.this,
							"测试结果文件：" + Const.RESULT_FILE_PATH,
							Toast.LENGTH_LONG).show();
					stopSelf();
				}
			});
			createFloatingWindow();
		}
		createResultCsv();
		handler.postDelayed(task, 1000);
	}

	private void readSettingInfo(Intent intent) {
		try {
			Properties properties = new Properties();
			properties.load(new FileInputStream(settingTempFile));
			String interval = properties.getProperty(Const.INTERVAL).trim();
			isFloating = "true".equals(properties.getProperty(Const.ISFLOAT)
					.trim()) ? true : false;
			sender = properties.getProperty(Const.SENDER).trim();
			password = properties.getProperty(Const.PASSWORD).trim();
			recipients = properties.getProperty(Const.RECIPIENTS).trim();
			time = "".equals(interval) ? "5" : interval;
			// recipients = properties.getProperty("recipients");
			receivers = recipients.split("\\s+");
			smtp = properties.getProperty(Const.SMTP);
			uploadServerIP = properties.getProperty(Const.UPLOAD_SERVER_IP);

		} catch (IOException e) {
			time = "5";
			isFloating = true;
			Log.e(LOG_TAG, e.getMessage());
		}
	}

	private void createResultCsv() {

		try {
			File resultFile = new File(Const.RESULT_FILE_PATH);
			resultFile.createNewFile();
			out = new FileOutputStream(resultFile);
			osw = new OutputStreamWriter(out, "UTF-8");
			bw = new BufferedWriter(osw);
			long totalMemorySize = memoryInfo.getTotalMemory();
			String totalMemory = fomart.format((double) totalMemorySize / 1024);
			bw.write("应用包名：," + packageName + "\r\n" + "应用名称: ," + processName
					+ "\r\n" + "应用PID: ,"
					+ pid
					+ "\r\n"
					+ "内存大小(MB)：,"
					+ totalMemory.replaceAll(",", "")// 1,980MB-->1980MB
					+ "MB\r\n" + "CPU型号：," + cpuInfo.getCpuName() + "\r\n"
					+ "系统版本：," + memoryInfo.getSDKVersion() + "\r\n" + "手机型号：,"
					+ memoryInfo.getPhoneType() + "\r\n" + "UID：," + uid
					+ "\r\n" + "启动时间:," + START_TIME + "\r\n");

			bw.write("时间" + "," + "应用占用内存PSS(MB)" + "," + "应用占用内存比(%)" + ","
					+ " 机器剩余内存(MB)" + "," + "应用占用CPU率(%)" + "," + "CPU总使用率(%)"
					+ "," + "流量(KB)" + "," + "电量(%)" + "," + "电流(mA)" + ","
					+ "温度(C)" + "," + "电压(V)" + "\r\n");

		} catch (IOException e) {
			Log.e(LOG_TAG, e.getMessage());
		}
	}

	private void createFloatingWindow() {
		SharedPreferences shared = getSharedPreferences("float_flag",
				Activity.MODE_PRIVATE);
		SharedPreferences.Editor editor = shared.edit();
		editor.putInt("float", 1);
		editor.commit();
		windowManager = (WindowManager) getApplicationContext()
				.getSystemService("window");
		wmParams = ((MyApplication) getApplication()).getMywmParams();
		wmParams.type = 2002;
		wmParams.flags |= 8;
		wmParams.gravity = Gravity.LEFT | Gravity.TOP;
		wmParams.x = 0;
		wmParams.y = 0;
		wmParams.width = WindowManager.LayoutParams.WRAP_CONTENT;
		wmParams.height = WindowManager.LayoutParams.WRAP_CONTENT;
		wmParams.format = 1;
		windowManager.addView(viFloatingWindow, wmParams);
		viFloatingWindow.setOnTouchListener(new OnTouchListener() {
			public boolean onTouch(View v, MotionEvent event) {
				x = event.getRawX();
				y = event.getRawY() - 25;
				switch (event.getAction()) {
				case MotionEvent.ACTION_DOWN:
					startX = x;
					startY = y;
					mTouchStartX = event.getX();
					mTouchStartY = event.getY();
					Log.d("startP", "startX" + mTouchStartX + "====startY"
							+ mTouchStartY);
					break;
				case MotionEvent.ACTION_MOVE:
					updateViewPosition();
					break;

				case MotionEvent.ACTION_UP:
					updateViewPosition();
					// showImg();
					mTouchStartX = mTouchStartY = 0;
					break;
				}
				return true;
			}
		});

		btnWifi.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				try {
					btnWifi = (Button) viFloatingWindow.findViewById(R.id.wifi);
					String buttonText = (String) btnWifi.getText();
					String wifiText = getResources().getString(
							R.string.openwifi);
					if (buttonText.equals(wifiText)) {
						wifiManager.setWifiEnabled(true);
						btnWifi.setText(R.string.closewifi);
					} else {
						wifiManager.setWifiEnabled(false);
						btnWifi.setText(R.string.openwifi);
					}
				} catch (Exception e) {
					Toast.makeText(viFloatingWindow.getContext(), "操作wifi失败",
							Toast.LENGTH_LONG).show();
					Log.e(LOG_TAG, e.toString());
				}
			}
		});
	}

	private Runnable task = new Runnable() {

		public void run() {
			if (!isServiceStop) {
				dataRefresh();
				handler.postDelayed(this, delaytime);
				if (isFloating) {
					windowManager.updateViewLayout(viFloatingWindow, wmParams);
				}
				// get app start time from logcat on every task running
				getStartTimeFromLogcat();
			} else {
				Intent intent = new Intent();
				intent.putExtra(Const.IS_SERVICE_STOP, true);
				intent.setAction(Const.IPER_SERVICE_NAME);
				sendBroadcast(intent);
				stopSelf();
			}
		}
	};

	private void getStartTimeFromLogcat() {
		if (!isGetStartTime || getStartTimeCount >= MAX_START_TIME_COUNT) {
			return;
		}
		try {
			// filter logcat by Tag:ActivityManager and Level:Info
			String logcatCommand = "logcat -v time -d ActivityManager:I *:S";
			Process process = Runtime.getRuntime().exec(logcatCommand);
			BufferedReader bufferedReader = new BufferedReader(
					new InputStreamReader(process.getInputStream()));
			StringBuilder strBuilder = new StringBuilder();
			String line = "";

			while ((line = bufferedReader.readLine()) != null) {
				strBuilder.append(line);
				strBuilder.append("\r\n");
				String regex = ".*Displayed.*" + startActivity
						+ ".*\\+(.*)ms.*";
				Log.d("my logs", regex);
				if (line.matches(regex)) {
					Log.w("my logs", line);
					if (line.contains("total")) {
						line = line.substring(0, line.indexOf("total"));
					}
					startTime = line.substring(line.lastIndexOf("+") + 1,
							line.lastIndexOf("ms") + 2);
					Toast.makeText(iPerService.this, "启动时间：" + startTime,
							Toast.LENGTH_LONG).show();
					isGetStartTime = false;
					break;
				}
			}
			getStartTimeCount++;
			// Log.w("my logs", "Start Time Log：" + strBuilder.toString());
			Log.w(LOG_TAG, "getStartCount：" + getStartTimeCount);
		} catch (IOException e) {
			Log.d(LOG_TAG, e.getMessage());
		}
	}

	private void dataRefresh() {
		int pidMemory = memoryInfo.getPidMemorySize(pid, getBaseContext());
		long freeMemory = memoryInfo.getFreeMemorySize(getBaseContext());
		String freeMemoryKb = fomart.format((double) freeMemory / 1024);
		String processMemory = fomart.format((double) pidMemory / 1024);
		String currentBatt = String.valueOf(currentInfo.getCurrentValue());
		// 异常数据过滤
		Log.d("my logs-before", currentBatt);
		try {
			if (Math.abs(Double.parseDouble(currentBatt)) >= 500) {
				currentBatt = "N/A";
			} else {
				currentBatt = currentBatt + "mA";
			}
		} catch (Exception e) {
			currentBatt = "N/A";
		}
		Log.d("my logs-after", currentBatt);
		ArrayList<String> processInfo = cpuInfo.getCpuRatioInfo(totalBatt,
				currentBatt, temperature, voltage);
		if (isFloating) {
			String processCpuRatio = "0";
			String totalCpuRatio = "0";
			String trafficSize = "0";
			int tempTraffic = 0;
			double trafficMb = 0;
			boolean isMb = false;
			if (!processInfo.isEmpty()) {
				processCpuRatio = processInfo.get(0);
				totalCpuRatio = processInfo.get(1);
				trafficSize = processInfo.get(2);
				if (!("".equals(trafficSize)) && !("-1".equals(trafficSize))) {
					tempTraffic = Integer.parseInt(trafficSize);
					if (tempTraffic > 1024) {
						isMb = true;
						trafficMb = (double) tempTraffic / 1024;
					}
				}
				// 如果cpu使用率存在且都不小于0，则输出
				if (processCpuRatio != null && totalCpuRatio != null) {
					txtUnusedMem.setText("应用/剩余内存:" + processMemory + "/"
							+ freeMemoryKb + "MB");
					txtTotalMem.setText("应用/总体CPU:" + processCpuRatio + "%/"
							+ totalCpuRatio + "%");
					String batt = "电流:" + currentBatt;
					if ("-1".equals(trafficSize)) {
						txtTraffic.setText(batt + ",流量:N/A");
					} else if (isMb)
						txtTraffic.setText(batt + ",流量:"
								+ fomart.format(trafficMb) + "MB");
					else
						txtTraffic.setText(batt + ",流量:" + trafficSize + "KB");
				}
				// 当内存为0,and cpu使用率为0时则是被测应用退出
				if ("0".equals(processMemory) && "0.00".equals(processCpuRatio)) {
					closeOpenedStream();
					isServiceStop = true;
					return;
				}
			}

		}
	}

	private void updateViewPosition() {
		wmParams.x = (int) (x - mTouchStartX);
		wmParams.y = (int) (y - mTouchStartY);
		windowManager.updateViewLayout(viFloatingWindow, wmParams);
	}

	public static void closeOpenedStream() {
		try {
			if (bw != null) {
				bw.write("N/A:表示不支持或者数据异常\r\n");
				bw.write("电流:小于0是放电大于0是充电\r\n启动时间:为空是应用已启动或者未搜集到启动时间\r\n");

				bw.close();
			}
			if (osw != null)
				osw.close();
			if (out != null)
				out.close();
		} catch (Exception e) {
			Log.d(LOG_TAG, e.getMessage());
		}
	}

	@Override
	public void onDestroy() {
		Log.i(LOG_TAG, "onDestroy");
		if (windowManager != null)
			windowManager.removeView(viFloatingWindow);
		handler.removeCallbacks(task);
		closeOpenedStream();

		// replace the start time in file

		if (!"".equals(startTime)) {
			// START_TIME = "#startTime"
			replaceFileString(Const.RESULT_FILE_PATH, START_TIME, "启动时间:"
					+ startTime + "\r\n");
		} else {
			replaceFileString(Const.RESULT_FILE_PATH, START_TIME, "N/A");
		}
		isStop = true;
		unregisterReceiver(batteryBroadcast);

		boolean isSendMailSuccessfully = false;
		boolean isUploadServerSuccessfully = false;

		String uploadServletUrl = "http://" + uploadServerIP
				+ Const.UPLOAD_SERVLET_PERFIX;
		String reportUrl = "http://" + uploadServerIP + "/perf.html?run_stamp="
				+ Const.RUN_STAMP;

		try {
			// 测试结果报表上传服务器,采用同步方法
			isUploadServerSuccessfully = FileUpload.send(uploadServletUrl,
					Const.RESULT_FILE_PATH);

			if (isUploadServerSuccessfully) {
				Toast.makeText(this, "测试结果报表上传服务器:" + reportUrl,
						Toast.LENGTH_LONG).show();
			} else {
				Toast.makeText(this,
						"测试结果未成功上传服务器，结果保存在:" + Const.RESULT_FILE_PATH,
						Toast.LENGTH_LONG).show();
			}
			// 测试结果报表发送至邮箱
			isSendMailSuccessfully = MailSender.sendTextMail(sender,
					des.decrypt(password), smtp, "iPerformance Test Report",
					"Performance Report: " + reportUrl
							+ "\nCSV Data See attachment:",
					Const.RESULT_FILE_PATH, receivers);

			if (isSendMailSuccessfully) {
				Toast.makeText(this, "测试结果报表已发送至邮箱:" + recipients,
						Toast.LENGTH_LONG).show();
			} else {
				Toast.makeText(this,
						"测试结果未成功发送至邮箱，结果保存在:" + Const.RESULT_FILE_PATH,
						Toast.LENGTH_LONG).show();
			}

		} catch (Exception e) {
			e.printStackTrace();
			isSendMailSuccessfully = false;
		}

		super.onDestroy();
		stopForeground(true);
	}

	private void replaceFileString(String filePath, String replaceType,
			String replaceString) {
		try {
			File file = new File(filePath);
			BufferedReader reader = new BufferedReader(new FileReader(file));
			String line = "", oldtext = "";
			while ((line = reader.readLine()) != null) {
				oldtext += line + "\r\n";
			}
			reader.close();
			// replace a word in a file
			String newtext = oldtext.replaceAll(replaceType, replaceString);
			BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(filePath), "UTF-8"));
			writer.write(newtext);
			writer.close();
		} catch (IOException e) {
			Log.d(LOG_TAG, e.getMessage());
		}
	}

	@Override
	public IBinder onBind(Intent intent) {
		return null;
	}
}