package com.bitcoders.choppercharlie.subsystems.mediaManager

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.bitcoders.choppercharlie.R
import com.bitcoders.choppercharlie.subsystems.main.MainActivity

class DefaultLayoutActivity : AppCompatActivity() {

    private lateinit var mediaManagerBtn: Button


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connection)

//        mediaManagerBtn = findViewById(R.id.btn_mediaManager)
//        mediaManagerBtn.setOnClickListener {
//            startActivity(Intent(this, MediaMain::class.java))
//        }
    }
}