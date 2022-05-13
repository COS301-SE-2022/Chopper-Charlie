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

    public static ComputerVisionClient Authenticate(String subscriptionKey, String endpoint){
        return ComputerVisionManager.authenticate(subscriptionKey).withEndpoint(endpoint);
    }


    public static void AnalyzeRemoteImage(ComputerVisionClient compVisClient) {
        String pathToRemoteImage = "";

        List<VisualFeatureTypes> featuresToExtractFromRemoteImage = new ArrayList<>();
        featuresToExtractFromRemoteImage.add(VisualFeatureTypes.TAGS);

        System.out.println("\n\nAnalyzing an image from a URL ...");
    }
}