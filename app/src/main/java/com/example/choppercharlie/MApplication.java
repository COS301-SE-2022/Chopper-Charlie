package com.example.choppercharlie;
import android.app.Application;
import android.content.Context;
import com.secneo.sdk.Helper;
public class MApplication extends Application{
    @Override
    protected void attachBaseContext(Context paramContext) {
        super.attachBaseContext(paramContext);
        Helper.install(MApplication.this);
    }
    //this helps the drone connect but is still not working 100%
    //need to connect to drone
}
