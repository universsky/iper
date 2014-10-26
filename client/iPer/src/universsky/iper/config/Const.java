package universsky.iper.config;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import android.annotation.SuppressLint;

/**
 * @author 东海陈光剑 2014年5月21日 下午5:53:34
 * 
 */
public class Const {

	public static final String IPER_SERVICE_NAME = "universsky.iper.service.iPerService";
	public static String PASSWORD_ENCYPT_KEY = "iper";

	// public static final String UPLOAD_SERVLET_URL = "http://" +
	// "10.240.154.117"
	// + ":" + "8080" + "/iper/upload";
	// public static final String REPORT_URL = "http://" + "10.240.154.117"
	// + "/perf.html?run_stamp=";

	private static final String CSV_PREFIX = "iPer_TestResult_";
	public static final CharSequence NOTIFICATION_TITLE = "iPer";
	public static final CharSequence NOTIFICATION_TEXT = "iPer is running to get the perfermance parameters";

	@SuppressLint("SimpleDateFormat")
	static SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
	public static String RUN_STAMP = formatter.format(new Date());
	public static String RESULT_FILE_PATH = android.os.Environment
			.getExternalStorageDirectory()
			+ File.separator
			+ CSV_PREFIX
			+ RUN_STAMP + ".csv";

	public static final String UPLOAD_SERVER_IP = "uploadServerIP";

	public static final String SMTP = "smtp";

	public static final String RECIPIENTS = "recipients";

	public static final String PASSWORD = "password";

	public static final String SENDER = "sender";

	public static final String ISFLOAT = "isfloat";

	public static final String INTERVAL = "interval";

	public static final String SETTING_TEMP_FILE = "settingTempFile";

	public static final String START_ACTIVITY = "startActivity";

	public static final String PACKAGE_NAME = "packageName";

	public static final String UID = "uid";

	public static final String PID = "pid";

	public static final String PROCESS_NAME = "processName";

	public static final String UPLOAD_SERVLET_PERFIX = ":8080/iper/upload";

	public static final String IS_SERVICE_STOP = "isServiceStop";

}
