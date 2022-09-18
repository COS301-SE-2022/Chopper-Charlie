package com.bitcoders.choppercharlie.subsystems.main
import com.bitcoders.choppercharlie.subsystems.drone.ConnectionActivity
import android.app.Application
import android.content.Context
import com.secneo.sdk.Helper
class MApplication : Application() {
    override fun attachBaseContext(base: Context?) {
        super.attachBaseContext(base)
        Helper.install(this)
    }
}