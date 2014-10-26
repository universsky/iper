
package universsky.iper.utils;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;

import android.util.Log;


public class TrafficInfo {

	private static final String LOG_TAG = "iPer-"
			+ TrafficInfo.class.getSimpleName();

	private String uid;

	public TrafficInfo(String uid) {
		this.uid = uid;
	}

	
	public long getTrafficInfo() {
		Log.i(LOG_TAG, "get traffic information");
		RandomAccessFile rafRcv = null, rafSnd = null;
		String rcvPath = "/proc/uid_stat/" + uid + "/tcp_rcv";
		String sndPath = "/proc/uid_stat/" + uid + "/tcp_snd";
		long rcvTraffic = -1;
		long sndTraffic = -1;
		try {
			rafRcv = new RandomAccessFile(rcvPath, "r");
			rafSnd = new RandomAccessFile(sndPath, "r");
			rcvTraffic = Long.parseLong(rafRcv.readLine());
			sndTraffic = Long.parseLong(rafSnd.readLine());
		} catch (FileNotFoundException e) {
			rcvTraffic = -1;
			sndTraffic = -1;
		} catch (NumberFormatException e) {
			Log.e(LOG_TAG, "NumberFormatException: " + e.getMessage());
			e.printStackTrace();
		} catch (IOException e) {
			Log.e(LOG_TAG, "IOException: " + e.getMessage());
			e.printStackTrace();
		} finally {
			try {
				if (rafRcv != null) {
					rafRcv.close();
				}
				if (rafSnd != null)
					rafSnd.close();
			} catch (IOException e) {
				Log.i(LOG_TAG,
						"close randomAccessFile exception: " + e.getMessage());
			}
		}
		if (rcvTraffic == -1 || sndTraffic == -1) {
			return -1;
		} else
			return rcvTraffic + sndTraffic;
	}
}
