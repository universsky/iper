package universsky.iper.test;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

public class DataObject {
	private int data1 = 100;
	private String data2 = "hello";
	private ArrayList<String> list = new ArrayList<String>() {
		{
			add("String 1");
			add("String 2");
			add("String 3");
		}
	};

	// // getter and setter methods
	//
	// @Override
	// public String toString() {
	// return "DataObject [data1=" + data1 + ", data2=" + data2 + ", list="
	// + list + "]";
	// }

	public static void main(String[] args) {

		DataObject obj = new DataObject();
		Gson gson = new Gson();

		// convert java object to JSON format,
		// and returned as JSON formatted string
		String json = gson.toJson(obj);

		try {
			// write converted json data to a file named "file.json"
			FileWriter writer = new FileWriter("file.json");
			writer.write(json);
			writer.close();

		} catch (IOException e) {
			e.printStackTrace();
		}

		System.out.println(json);

	}

}
