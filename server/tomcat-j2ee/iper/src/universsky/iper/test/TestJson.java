/**
 * TestObjectToJson.java ct.util Report 下午9:06:52 2014年2月28日 2014
 */
package universsky.iper.test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import universsky.iper.result.CSVFileIO;
import com.google.gson.Gson;

/**
 * @author 东海陈光剑 2014年2月28日 下午9:06:52
 */
public class TestJson {

	/**
	 * @param args
	 *            void main
	 */
	public static void main(String[] args) {
		TestJson obj = new TestJson();
		Gson gson = new Gson();
		String json = gson.toJson(obj);
		System.out.println(json);

		// String json1 = "{'data1':100,'data2':'hello'}";
		// Gson gson1 = new Gson();
		// TestJson obj1 = gson1.fromJson(json1, TestJson.class);

		String run_stamp = "20140426114928";
		CSVFileIO qr = new CSVFileIO();
		// Map<String, ArrayList<String>> result = qr.query(run_stamp,
		// device_id);
		List<HashMap<String, ArrayList<String>>> result = qr.query(run_stamp);
		System.out.println(result);

	}

	private int data = 100;
	private String name = "Jack";

}
