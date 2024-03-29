package com.bitcoders.choppercharlie.subsystems.mediaManager

import android.Manifest
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.activity.viewModels
import androidx.core.app.ActivityCompat
import androidx.lifecycle.Observer
import com.bitcoders.choppercharlie.R
import com.bitcoders.choppercharlie.subsystems.LoginActivity
import com.bitcoders.choppercharlie.subsystems.Upload
import com.bitcoders.choppercharlie.subsystems.main.MainActivity
import com.bitcoders.choppercharlie.subsystems.mediaManager.ConnectionViewModel
import com.google.firebase.auth.FirebaseAuth
import dji.sdk.sdkmanager.DJISDKManager

class ConnectionActivity : AppCompatActivity() {
    private lateinit var mTextConnectionStatus: TextView
    private lateinit var mTextProduct: TextView
    private lateinit var mTextModelAvailable: TextView
    private lateinit var mBtnOpen: Button
    private lateinit var mVersionTv: TextView

    private val model: ConnectionViewModel by viewModels()

    ///////////////////////////////////////////////////////////
    private lateinit var GoFly: Button
    private lateinit var up: Button
    private lateinit var logout: Button
//////////////////////////////////////////////////////////


    companion object {
        const val TAG = "ConnectionActivity"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connection)
//////////////////////////////////////////////////////////////////////////////////////////
        GoFly = findViewById(R.id.gofly)
        GoFly.isEnabled = false
        GoFly.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }
        up = findViewById(R.id.blobmedia)
        up.setOnClickListener {
            startActivity(Intent(this, Upload::class.java))
        }
        logout = findViewById(R.id.logout)
        logout.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            FirebaseAuth.getInstance().signOut()
            Toast.makeText(this, "Logout Successful!", Toast.LENGTH_LONG).show()
        }
/////////////////////////////////////////////////////////////////////////////////////////
        ActivityCompat.requestPermissions(this,
            arrayOf(
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.VIBRATE,
                Manifest.permission.INTERNET,
                Manifest.permission.ACCESS_WIFI_STATE,
                Manifest.permission.WAKE_LOCK,
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.ACCESS_NETWORK_STATE,
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.CHANGE_WIFI_STATE,
                Manifest.permission.MOUNT_UNMOUNT_FILESYSTEMS,
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.SYSTEM_ALERT_WINDOW,
                Manifest.permission.READ_PHONE_STATE
            ), 1)

        initUI()
        model.registerApp()
        observers()

    }

    private fun initUI() {
        mTextConnectionStatus = findViewById(R.id.text_connection_status)
        mTextModelAvailable = findViewById(R.id.text_model_available)
        mTextProduct = findViewById(R.id.text_product_info)
        mBtnOpen = findViewById(R.id.btn_open)
        mVersionTv = findViewById(R.id.textView2)
        mVersionTv.text = resources.getString(R.string.sdk_version, DJISDKManager.getInstance().sdkVersion)
        mBtnOpen.isEnabled = false
        mBtnOpen.setOnClickListener {
            val intent = Intent(this, MediaMain::class.java)
            startActivity(intent)
        }
    }

    private fun observers() {
        model.connectionStatus.observe(this, Observer<Boolean> { isConnected ->
            if (isConnected) {
                mTextConnectionStatus.text = "Status: Connected"
                mBtnOpen.isEnabled = true
                GoFly.isEnabled = true
            }
            else {
                mTextConnectionStatus.text = "Status: Disconnected"
                mBtnOpen.isEnabled = false
                GoFly.isEnabled = false
            }
        })

        model.product.observe(this, Observer { baseProduct ->
            if (baseProduct != null && baseProduct.isConnected) {
                mTextModelAvailable.text = baseProduct.firmwarePackageVersion
                mTextProduct.text = baseProduct.model.displayName
            }

        })
    }
}