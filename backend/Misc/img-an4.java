import com.microsoft.azure.cognitiveservices.vision.computervision.*;
import com.microsoft.azure.cognitiveservices.vision.computervision.implementation.ComputerVisionImpl;
import com.microsoft.azure.cognitiveservices.vision.computervision.models.*;

import java.io.*;
import java.nio.file.Files;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ImageAnalysis {
    static String subscriptionKey = "SUBSCRIPTION KEY HERE";
    static String endpoint = "COMPUTER VISION ENDPOINT";

    public static void main(String[] args) {
    
    System.out.println("\nAzure Cognitive Services Computer Vision - Java");
    ComputerVisionClient compVisClient = Authenticate(subscriptionKey, endpoint); 
    AnalyzeRemoteImage(compVisClient);
    }

}