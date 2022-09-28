package com.bitcoders.choppercharlie.subsystems


import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import com.bitcoders.choppercharlie.R
import com.bitcoders.choppercharlie.databinding.ActivityLoginBinding

import com.bitcoders.choppercharlie.subsystems.main.MainActivity
import com.bitcoders.choppercharlie.subsystems.mediaManager.ConnectionActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import okhttp3.*
import okio.IOException

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)


        auth = FirebaseAuth.getInstance()

        binding.btnLogIn.setOnClickListener{
            val email = binding.emailInput.text.toString()
            val pass = binding.passwordInput.text.toString()

            if(email.isNotEmpty() && pass.isNotEmpty()){
                auth.signInWithEmailAndPassword(email,pass).addOnCompleteListener{
                    if(it.isSuccessful){
                        val intent = Intent(this, ConnectionActivity::class.java)
                        startActivity(intent)
                    }
                    else{
                        Toast.makeText(this, it.exception.toString(), Toast.LENGTH_LONG).show()
                    }
                }
            }
            else{
                Toast.makeText(this, "Empty fields are not allowed!", Toast.LENGTH_LONG).show()
            }
        }



    }

    public override fun onStart() {
        super.onStart()

        val currentUser = auth.currentUser
        updateUI(currentUser)
    }

    fun updateUI(currentUser : FirebaseUser?){

    }


}