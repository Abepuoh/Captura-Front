package com.abepuoh.CapturaP;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.ahm.capacitor.biometric.BiometricAuth;

public class MainActivity extends BridgeActivity  {
    @Override
    public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      registerPlugin(BiometricAuth.class);
    }
}

