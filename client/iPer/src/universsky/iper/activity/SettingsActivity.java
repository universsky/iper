package universsky.iper.activity;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import universsky.iper.R;
import universsky.iper.config.Const;
import universsky.iper.utils.EncryptData;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

public class SettingsActivity extends Activity {

	private static final String LOG_TAG = "iPer-"
			+ SettingsActivity.class.getSimpleName();

	private CheckBox chkFloat;
	private EditText edtTime;
	private EditText edtRecipients;
	private EditText edtSender;
	private EditText edtPassword;
	private EditText edtUploadServerIP;
	private EditText edtSmtp;
	private String time, sender;
	private String uploadServerIP;
	private String prePassword, curPassword;
	private String settingTempFile;
	private String recipients, smtp;
	private String[] receivers;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		Log.i(LOG_TAG, "onCreate");
		super.onCreate(savedInstanceState);
		setContentView(R.layout.settings);

		final EncryptData des = new EncryptData(Const.PASSWORD_ENCYPT_KEY);
		Intent intent = this.getIntent();
		settingTempFile = intent.getStringExtra(Const.SETTING_TEMP_FILE);

		chkFloat = (CheckBox) findViewById(R.id.floating);
		edtTime = (EditText) findViewById(R.id.time);
		edtSender = (EditText) findViewById(R.id.sender);
		edtPassword = (EditText) findViewById(R.id.password);
		edtRecipients = (EditText) findViewById(R.id.recipients);
		edtSmtp = (EditText) findViewById(R.id.smtp);
		edtUploadServerIP = (EditText) findViewById(R.id.upload_server);

		Button btnSave = (Button) findViewById(R.id.save);

		boolean floatingTag = true;

		try {
			Properties properties = new Properties();
			properties.load(new FileInputStream(settingTempFile));

			String interval = properties.getProperty(Const.INTERVAL).trim();
			String isfloat = properties.getProperty(Const.ISFLOAT).trim();

			String sender0 = properties.getProperty(Const.SENDER).trim();
			sender = "".equals(sender0) ? "universsky@126.com" : sender0;

			String password0 = properties.getProperty(Const.PASSWORD).trim();
			prePassword = "".equals(password0) ? "15850537705163" : password0;

			String recipients0 = properties.getProperty(Const.RECIPIENTS)
					.trim();
			recipients = "".equals(recipients0) ? "universsky@126.com"
					: recipients0;

			time = "".equals(interval) ? "5" : interval;
			floatingTag = "false".equals(isfloat) ? false : true;
			String smtp0 = properties.getProperty(Const.SMTP);
			smtp = "".equals(smtp0) ? "smtp.126.com" : smtp0;

			String uploadServer0 = properties
					.getProperty(Const.UPLOAD_SERVER_IP);
			uploadServerIP = ("".equals(uploadServer0) || uploadServer0 == null) ? "10.240.154.117"
					: uploadServer0;

		} catch (FileNotFoundException e) {
			Log.e(LOG_TAG, "FileNotFoundException: " + e.getMessage());
			e.printStackTrace();
		} catch (IOException e) {
			Log.e(LOG_TAG, "IOException: " + e.getMessage());
			e.printStackTrace();
		}
		edtTime.setText(time);
		chkFloat.setChecked(floatingTag);
		edtRecipients.setText(recipients);
		edtSender.setText(sender);
		edtPassword.setText(prePassword);
		edtSmtp.setText(smtp);
		edtUploadServerIP.setText(uploadServerIP);

		// edtTime.setInputType(InputType.TYPE_CLASS_NUMBER);

		btnSave.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				time = edtTime.getText().toString().trim();
				sender = edtSender.getText().toString().trim();

				if (!"".equals(sender) && !checkMailFormat(sender)) {
					Toast.makeText(SettingsActivity.this, "发件人邮箱格式不正确",
							Toast.LENGTH_LONG).show();
					return;
				}
				recipients = edtRecipients.getText().toString().trim();
				receivers = recipients.split("\\s+");
				for (int i = 0; i < receivers.length; i++) {
					if (!"".equals(receivers[i])
							&& !checkMailFormat(receivers[i])) {
						Toast.makeText(SettingsActivity.this,
								"收件人邮箱" + receivers[i] + "格式不正确",
								Toast.LENGTH_LONG).show();
						return;
					}
				}
				curPassword = edtPassword.getText().toString().trim();
				smtp = edtSmtp.getText().toString().trim();
				uploadServerIP = edtUploadServerIP.getText().toString().trim();

				if (checkMailConfig(sender, recipients, smtp, curPassword) == -1) {
					Toast.makeText(SettingsActivity.this, "邮箱配置不完整，请完善所有信息",
							Toast.LENGTH_LONG).show();
					return;
				}
				if (!isNumeric(time)) {
					Toast.makeText(SettingsActivity.this, "输入数据无效，请重新输入",
							Toast.LENGTH_LONG).show();
					edtTime.setText("");
				} else if ("".equals(time) || Long.parseLong(time) == 0) {
					Toast.makeText(SettingsActivity.this, "输入数据为空,请重新输入",
							Toast.LENGTH_LONG).show();
					edtTime.setText("");
				} else if (Integer.parseInt(time) > 600) {
					Toast.makeText(SettingsActivity.this, "数据超过最大值600，请重新输入",
							Toast.LENGTH_LONG).show();
				} else {
					try {
						Properties properties = new Properties();
						properties.setProperty(Const.INTERVAL, time);
						properties.setProperty(Const.ISFLOAT,
								chkFloat.isChecked() ? "true" : "false");
						properties.setProperty(Const.SENDER, sender);
						Log.d(LOG_TAG, "sender=" + sender);
						try {
							// Set properties
							properties.setProperty(
									Const.PASSWORD,
									curPassword.equals(prePassword) ? curPassword
											: ("".equals(curPassword) ? ""
													: des.encrypt(curPassword)));
							Log.d(LOG_TAG, "curPassword=" + curPassword);
							Log.d(LOG_TAG,
									"encrtpt=" + des.encrypt(curPassword));
						} catch (Exception e) {
							properties.setProperty(Const.PASSWORD, "");
						}
						properties.setProperty(Const.RECIPIENTS, recipients);
						properties.setProperty(Const.SMTP, smtp);
						properties.setProperty(Const.UPLOAD_SERVER_IP,
								uploadServerIP);

						FileOutputStream fos = new FileOutputStream(
								settingTempFile);

						properties.store(fos, "Setting Data");
						fos.close();
						Toast.makeText(SettingsActivity.this, "保存成功",
								Toast.LENGTH_LONG).show();
						Intent intent = new Intent();
						setResult(Activity.RESULT_FIRST_USER, intent);
						SettingsActivity.this.finish();
					} catch (FileNotFoundException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		});
	}

	@Override
	public void finish() {
		super.finish();
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
	}

	private int checkMailConfig(String sender, String recipients, String smtp,
			String curPassword) {
		if (!"".equals(curPassword) && !"".equals(sender)
				&& !"".equals(recipients) && !"".equals(smtp)) {
			return 1;
		} else if ("".equals(curPassword) && "".equals(sender)
				&& "".equals(recipients) && "".equals(smtp)) {
			return 0;
		} else
			return -1;
	}

	private boolean checkMailFormat(String mail) {
		String strPattern = "^[a-zA-Z][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*"
				+ "[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$";
		Pattern p = Pattern.compile(strPattern);
		Matcher m = p.matcher(mail);
		return m.matches();
	}

	private boolean isNumeric(String inputStr) {
		for (int i = inputStr.length(); --i >= 0;) {
			if (!Character.isDigit(inputStr.charAt(i))) {
				return false;
			}
		}
		return true;
	}

}
