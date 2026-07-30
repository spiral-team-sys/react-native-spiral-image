import UIKit

enum ExifUtils {

    static func fixOrientation(
        _ image: UIImage
    ) -> UIImage {

        if image.imageOrientation == .up {
            return image
        }

        UIGraphicsBeginImageContextWithOptions(
            image.size,
            false,
            image.scale
        )

        defer {
            UIGraphicsEndImageContext()
        }

        image.draw(in: CGRect(
            origin: .zero,
            size: image.size
        ))

        guard let normalized = UIGraphicsGetImageFromCurrentImageContext() else {
            return image
        }

        return normalized
    }
}