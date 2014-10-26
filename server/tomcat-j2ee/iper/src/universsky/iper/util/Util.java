/**
 * 
 */
package universsky.iper.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author jack
 *
 */
public class Util {

	public static String getTimeStamp() {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd:HH:mm:ss");
		Date date = new Date();
		String timeStamp = dateFormat.format(date);
		return timeStamp;
	}

}
