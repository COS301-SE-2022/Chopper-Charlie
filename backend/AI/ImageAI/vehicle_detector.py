import cv2
import numpy as np

class VehicleDetector:

    def __init__(self):

        net = cv2.dnn.readNet("backend/AI/ImageAI/yolov4.weights", "backend/AI/ImageAI/yolov4.cfg")
        self.model = cv2.dnn_DetectionModel(net)
        self.model.setInputParams(size=(832, 832), scale=1 / 255)
        self.classes_allowed = [2, 3, 5, 6, 7]


    def detect_vehicles(self, img):
        vehicles_boxes = []
        class_ids, scores, boxes = self.model.detect(img, nmsThreshold=0.4)
        for class_id, score, box in zip(class_ids, scores, boxes):
            if score < 0.5:
                continue
            if class_id in self.classes_allowed:
                vehicles_boxes.append(box)
        return vehicles_boxes

