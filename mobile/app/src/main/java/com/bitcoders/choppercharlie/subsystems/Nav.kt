package com.bitcoders.choppercharlie.subsystems

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.bitcoders.choppercharlie.R
import com.bitcoders.choppercharlie.subsystems.main.MainActivity
import com.bitcoders.choppercharlie.subsystems.mediaManager.ConnectionActivity
import com.bitcoders.choppercharlie.subsystems.mediaManager.MediaMain

class Nav : AppCompatActivity() {

    private lateinit var GoFly: Button
    private lateinit var up: Button
    private lateinit var btn_op: Button
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_nav)

        GoFly = findViewById(R.id.Gofly)
        GoFly.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }
        up = findViewById(R.id.up)
        up.setOnClickListener {
            startActivity(Intent(this, Upload::class.java))
        }
        btn_op = findViewById(R.id.btn_op)
        btn_op.setOnClickListener {
            startActivity(Intent(this, MediaMain::class.java))
        }
    }
}