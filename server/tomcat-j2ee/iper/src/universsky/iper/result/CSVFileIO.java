package universsky.iper.result;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import universsky.iper.config.Config;

import com.csvreader.CsvReader;
import com.csvreader.CsvWriter;

/**
 * @author 2014.5.22 2:41:20
 * 
 */
public class CSVFileIO {
	public static String run_stamp;

	public List<HashMap<String, ArrayList<String>>> query(String run_stamp) {
		List<HashMap<String, ArrayList<String>>> result = new ArrayList<HashMap<String, ArrayList<String>>>();
		String csvFilePath = Config.CSV_FILE_PREFIX + run_stamp + ".csv";
		ArrayList<String[]> csvList = new ArrayList<String[]>();
		try {
			CsvReader reader = new CsvReader(csvFilePath, ',',
					Charset.forName("UTF-8"));

			while (reader.readRecord()) {
				csvList.add(reader.getValues());
			}
			reader.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		HashMap<String, ArrayList<String>> DCMap = new HashMap<String, ArrayList<String>>();

		ArrayList<String> package_name = new ArrayList<String>();
		package_name.add(csvList.get(0)[1]);
		DCMap.put("package_name", package_name);

		ArrayList<String> app_name = new ArrayList<String>();
		app_name.add(csvList.get(1)[1]);
		DCMap.put("app_name", app_name);

		ArrayList<String> pid = new ArrayList<String>();
		pid.add(csvList.get(2)[1]);
		DCMap.put("pid", pid);

		ArrayList<String> mem = new ArrayList<String>();
		mem.add(csvList.get(3)[1]);
		DCMap.put("mem", mem);

		ArrayList<String> cpu_type = new ArrayList<String>();
		cpu_type.add(csvList.get(4)[1]);
		DCMap.put("cpu_type", cpu_type);

		ArrayList<String> sys_version = new ArrayList<String>();
		sys_version.add(csvList.get(5)[1]);
		DCMap.put("sys_version", sys_version);

		ArrayList<String> mobile_type = new ArrayList<String>();
		mobile_type.add(csvList.get(6)[1]);
		DCMap.put("mobile_type", mobile_type);

		ArrayList<String> uid = new ArrayList<String>();
		uid.add(csvList.get(7)[1]);
		DCMap.put("uid", uid);

		ArrayList<String> start_time = new ArrayList<String>();
		start_time.add(csvList.get(8)[1]);
		DCMap.put("start_time", start_time);

		// //////////////////////////////////////////////////////

		int L = csvList.size();

		ArrayList<String> time = new ArrayList<String>();
		for (int i = 10; i < L - 3; i++) {
			time.add(csvList.get(i)[0]);
		}
		DCMap.put("time", time);

		ArrayList<String> pss = new ArrayList<String>();
		for (int i = 10; i < L - 3; i++) {
			pss.add(csvList.get(i)[1]);
		}
		DCMap.put("pss", pss);

		ArrayList<String> mem_ratio = new ArrayList<String>();
		for (int i = 10; i < L - 3; i++) {
			mem_ratio.add(csvList.get(i)[2]);
		}
		DCMap.put("mem_ratio", mem_ratio);

		ArrayList<String> mem_free = new ArrayList<String>();
		for (int i = 10; i < L - 3; i++) {
			mem_free.add(csvList.get(i)[3]);
		}
		DCMap.put("mem_free", mem_free);

		ArrayList<String> cpu_ratio = new ArrayList<String>();
		for (int i = 10; i < L - 3; i++) {
			cpu_ratio.add(csvList.get(i)[4]);
		}
		DCMap.put("cpu_ratio", cpu_ratio);

		ArrayList<String> ttl_cpu_ratio = new ArrayList<String>();
		for (int i = 10; i < L - 3; i++) {
			ttl_cpu_ratio.add(csvList.get(i)[5]);
		}
		DCMap.put("ttl_cpu_ratio", ttl_cpu_ratio);

		ArrayList<String> traffic = new ArrayList<String>();
		for (int i = 10; i < L - 3; i++) {
			traffic.add(csvList.get(i)[6]);
		}
		DCMap.put("traffic", traffic);

		ArrayList<String> battery = new ArrayList<String>();
		for (int i = 10; i < L - 3; i++) {
			battery.add(csvList.get(i)[7]);
		}
		DCMap.put("battery", battery);

		ArrayList<String> current = new ArrayList<String>();
		for (int i = 10; i < L - 3; i++) {
			current.add(csvList.get(i)[8]);
		}
		DCMap.put("current", current);

		ArrayList<String> temperature = new ArrayList<String>();
		for (int i = 10; i < L - 3; i++) {
			temperature.add(csvList.get(i)[9]);
		}
		DCMap.put("temperature", temperature);

		ArrayList<String> voltage = new ArrayList<String>();
		for (int i = 10; i < L - 3; i++) {
			voltage.add(csvList.get(i)[10]);
		}
		DCMap.put("voltage", voltage);

		result.add(DCMap);

		return result;
	}

	public static void readCsv(String csvFilePath) {
		try {
			ArrayList<String[]> csvList = new ArrayList<String[]>();
			CsvReader reader = new CsvReader(csvFilePath, ',',
					Charset.forName("UTF8"));

			while (reader.readRecord()) {
				csvList.add(reader.getValues());
			}
			reader.close();

			for (int row = 0; row < csvList.size(); row++) {
				String[] cell = csvList.get(row);

				if (cell.length == 2) {
					System.out.print(cell[0] + "\t");
					System.out.print(cell[1] + "\t");

				}

				if (cell.length == 11) {
					for (int i = 0; i < cell.length; i++) {
						System.out.print(cell[i] + "\t");
					}
				}

				System.out.println();
			}
		} catch (Exception ex) {
			System.out.println(ex);
		}
	}

	public static void WriteCsv() {
		try {
			String csvFilePath = "D:/log/Alarm20101125.csv";
			CsvWriter wr = new CsvWriter(csvFilePath, ',',
					Charset.forName("SJIS"));
			String[] contents = { "A", "B", "C" };
			wr.writeRecord(contents);
			wr.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String run_stamp = "20140729145031";
		CSVFileIO csv = new CSVFileIO();
		List<HashMap<String, ArrayList<String>>> result = csv.query(run_stamp);
		System.out.println(result);
	}

}
