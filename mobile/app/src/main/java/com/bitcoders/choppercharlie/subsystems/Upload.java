package com.bitcoders.choppercharlie.subsystems;

import android.annotation.SuppressLint;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.bitcoders.choppercharlie.R;
import com.bitcoders.choppercharlie.subsystems.main.MainActivity;
import com.bitcoders.choppercharlie.subsystems.main.MainActivity;
import com.microsoft.azure.storage.CloudStorageAccount;
import com.microsoft.azure.storage.blob.CloudBlobClient;
import com.microsoft.azure.storage.blob.CloudBlobContainer;
import com.microsoft.azure.storage.blob.CloudBlockBlob;

import java.io.File;

public class Upload extends AppCompatActivity {

    public Button Button;
    //public View Button2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload);

        Button = findViewById(R.id.button);
        Button.setOnClickListener(v -> {
            //If you execute heavy processing using the network in the UI thread, it will cause trouble, so execute it in another thread
            @SuppressLint("StaticFieldLeak") AsyncTask<Void, Void, Void> task = new AsyncTask<Void, Void, Void>() {
                @SuppressLint("IntentReset")
                @Override
                protected Void doInBackground(Void... params) {
                    //String for connecting with Azure Blob Storage, Cho important. It's as important as the password for the Root account.
                    String storageConnectionString = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net";
                    //Get the path to DCIM
                    File dir = new File(Environment.getExternalStorageDirectory() + "/" + Environment.DIRECTORY_DOWNLOADS);
                    //Set the path to the image file on DCIM
                    File file = new File(dir.getAbsolutePath() + "/DJI_0436.jpg");


                    //Log output to check if the path to the correct image is taken
                    Log.d("The selected image is", file.getPath());

                    try {

                        //Log.d("11111111", file.getPath());

                        //Start connecting to Azure Storage Account
                        CloudStorageAccount storageAccount = CloudStorageAccount.parse(storageConnectionString);

                        //Log.d("w22222222222", file.getPath());

                        //Get a client to connect to a blob in your Azure Storage Account
                        CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

                        //Log.d("333333333333", file.getPath());

                        //Get the blob container, specify the container as a string
                        CloudBlobContainer container = blobClient.getContainerReference("yaasirbarmaniagmailcom");

                        //Log.d("4443333333333", file.getPath());

                        //The character string passed in the argument of getBlockBlobReference becomes the file name saved in Blob.
                        //If a file with the same name already exists, it will be overwritten
                        CloudBlockBlob blob = container.getBlockBlobReference(file.getName());

                        //Log.d("5555533333333", file.getPath());

                        //Exit the function if the file does not exist
                        if (!file.exists()) return null;

                        //Log.d("8555533333333", file.getPath());

                        //Upload to Azure Blob Storage
                        blob.upload(new java.io.FileInputStream(file), file.length());

                        Log.d("Uploaded", file.getName());


                    } catch (Exception e) {
                        //Spits a stack trace for analysis if an error occurs
                        e.printStackTrace();
                    }
                    return null;
                }
            };

            try {
                //Run in a separate thread
                task.execute();
            } catch (Exception e) {
                Handler handler = new Handler();
                handler.post(new Runnable() {
                    //I want to display an error message on toast when an error occurs,
                    //I'm running in the UI thread because I can't see the toast unless it's in the UI thread
                    @Override
                    public void run() {
                        Toast.makeText(Upload.this, "Faild: Upload blob storage", Toast.LENGTH_LONG).show();
                    }
                });
            }
        });

    }



}