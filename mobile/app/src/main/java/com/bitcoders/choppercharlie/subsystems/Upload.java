package com.bitcoders.choppercharlie.subsystems;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.provider.OpenableColumns;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.loader.content.CursorLoader;
import com.bitcoders.choppercharlie.R;
import com.microsoft.azure.storage.CloudStorageAccount;
import com.microsoft.azure.storage.blob.CloudBlobClient;
import com.microsoft.azure.storage.blob.CloudBlobContainer;
import com.microsoft.azure.storage.blob.CloudBlockBlob;

import java.io.File;

import xdroid.toaster.Toaster;

public class Upload extends AppCompatActivity {

    String filename;

    public Button Button2;

    private static Uri uri = null;
    public Intent data;
    File file;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload);

        Button2 = findViewById(R.id.button2);
        Button2.setOnClickListener(v -> {
            //If you execute heavy processing using the network in the UI thread, it will cause trouble, so execute it in another thread
            @SuppressLint("StaticFieldLeak") AsyncTask<Void, Void, Void> task = new AsyncTask<Void, Void, Void>() {
                @SuppressLint("IntentReset")
                @Override
                protected Void doInBackground(Void... params) {
                    //String for connecting with Azure Blob Storage, Cho important. It's as important as the password for the Root account.
                    String storageConnectionString = "DefaultEndpointsProtocol=https;AccountName=choppercharlie;AccountKey=Bcrvc/ix8TmB/hoEE2fmp44iHAqEWeiZ1fr7Fml9Z0+Q7RI8NvX2kbqzeufPKHRY54hk+wFgE/+a+AStzl2qTw==;EndpointSuffix=core.windows.net";
                    //Get the path to DCIM

                    File dir = new File(Environment.getExternalStorageDirectory() + "/" + Environment.DIRECTORY_DOWNLOADS);

                    file = new File(dir.getAbsolutePath() + "/"+ getFileName(uri) );



                    //Log output to check if the path to the correct image is taken
                    Log.d("The selected image is", file.getPath());
                    Toaster.toast("The selected media is: " + file.getName());
                    try {



                        //Start connecting to Azure Storage Account
                        CloudStorageAccount storageAccount = CloudStorageAccount.parse(storageConnectionString);



                        //Get a client to connect to a blob in your Azure Storage Account
                        CloudBlobClient blobClient = storageAccount.createCloudBlobClient();


                        //Get the blob container, specify the container as a string
                        CloudBlobContainer container = blobClient.getContainerReference("yaasirbarmaniagmailcom");



                        //The character string passed in the argument of getBlockBlobReference becomes the file name saved in Blob.
                        //If a file with the same name already exists, it will be overwritten
                        CloudBlockBlob blob = container.getBlockBlobReference(file.getName());



                        //Exit the function if the file does not exist
                        if (!file.exists()) {
                            return null;
                        }



                        //Upload to Azure Blob Storage
                        blob.upload(new java.io.FileInputStream(file), file.length());

                        Log.d("Uploaded", file.getName());
                        Toaster.toast("Successfully Uploaded: " + file.getName());

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

    ActivityResultLauncher<Intent> sActivityResultLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            new ActivityResultCallback<ActivityResult>() {
                ContentResolver contentResolver;
                @Override
                public void onActivityResult(ActivityResult result) {
                    if (result.getResultCode() == Activity.RESULT_OK){
                        Intent data = result.getData();
                        uri = data.getData();
                        filename = uri.getLastPathSegment();

                    }
                }
            }
    );


    public void openFileDialog(View view) {

        data = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        data.addCategory(Intent.CATEGORY_OPENABLE);
        data.setType("*/*");
        String [] mimeTypes = {"image/*", "video/*"};
        data.putExtra(Intent.EXTRA_MIME_TYPES, mimeTypes);
        data = Intent.createChooser(data, "Choose a media file");
        sActivityResultLauncher.launch(data);
    }

    @SuppressLint("Range")
    public String getFileName(Uri uri) {
        String result = null;
        if (uri.getScheme().equals("content")) {
            Cursor cursor = getContentResolver().query(uri, null, null, null, null);
            try {
                if (cursor != null && cursor.moveToFirst()) {
                    result = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME));
                }
            } finally {
                cursor.close();
            }
        }
        if (result == null) {
            result = uri.getPath();
            int cut = result.lastIndexOf('/');
            if (cut != -1) {
                result = result.substring(cut + 1);
            }
        }
        return result;
    }

}