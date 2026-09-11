import UIKit

enum Resize {

    static func execute(
        _ image: UIImage,
        options: ImageResizeOptions
    ) -> UIImage {

        let originalWidth = image.size.width
        let originalHeight = image.size.height

        let requestedWidth = options.width.map {
            CGFloat($0)
        }

        let requestedHeight = options.height.map {
            CGFloat($0)
        }

        var targetWidth = requestedWidth ?? originalWidth
        var targetHeight = requestedHeight ?? originalHeight


        switch (requestedWidth, requestedHeight) {

        case (.none, .none):

            break


        case (.some(let width), .none):

            let scale = width / originalWidth

            targetHeight = originalHeight * scale


        case (.none, .some(let height)):

            let scale = height / originalHeight

            targetWidth = originalWidth * scale


        case (.some(let width), .some(let height)):

            let widthRatio = width / originalWidth
            let heightRatio = height / originalHeight

            let scale = min(
                widthRatio,
                heightRatio
            )

            if options.keepAspectRatio {

                targetWidth = originalWidth * scale
                targetHeight = originalHeight * scale

            } else {

                targetWidth = width
                targetHeight = height
            }
        }


        targetWidth = max(
            1,
            round(targetWidth)
        )

        targetHeight = max(
            1,
            round(targetHeight)
        )


        if Int(targetWidth) == Int(originalWidth),
           Int(targetHeight) == Int(originalHeight) {
            return image
        }


        let renderer = UIGraphicsImageRenderer(
            size: CGSize(
                width: targetWidth,
                height: targetHeight
            )
        )


        return renderer.image { _ in

            image.draw(
                in: CGRect(
                    x: 0,
                    y: 0,
                    width: targetWidth,
                    height: targetHeight
                )
            )
        }
    }
}