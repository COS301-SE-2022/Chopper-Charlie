import cv2
from vehicle_detector import VehicleDetector
vd = VehicleDetector()


vehicles_folder_count = 0



img = cv2.imread("backend/AI/ImageAI/carss.jpg")

vehicle_boxes = vd.detect_vehicles(img)
vehicle_count = len(vehicle_boxes)

vehicles_folder_count += vehicle_count

for box in vehicle_boxes:
    x, y, w, h = box

    cv2.rectangle(img, (x, y), (x + w, y + h), (25, 0, 180), 3)

    cv2.putText(img, "Cars: " + str(vehicle_count), (20, 50), 0, 2, (100, 200, 0), 3)

cv2.imshow("Car Recognition", img)
cv2.waitKey(0)

print("Cars: ", vehicles_folder_count)