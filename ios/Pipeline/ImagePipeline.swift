import UIKit

struct ImageResizeOptions {

    let input: String
    let output: String

    let width: Double?
    let height: Double?

    let quality: Double?
    let format: ImageFormat?
    let keepAspectRatio: Bool

    init(
        input: String,
        output: String,
        width: Double? = nil,
        height: Double? = nil,
        quality: Double? = nil,
        format: ImageFormat? = nil,
        keepAspectRatio: Bool = true
    ) {
        self.input = input
        self.output = output
        self.width = width
        self.height = height
        self.quality = quality
        self.format = format
        self.keepAspectRatio = keepAspectRatio
    }
}

enum ImagePipeline {

    static func execute(
        options: ImageResizeOptions
    ) throws -> ImageResult {

        // Decode
        var image = try Decoder.decode(
            options.input
        )

        // Fix EXIF orientation
        image = ExifUtils.fixOrientation(
            image
        )

        // Resize
        image = Resize.execute(
            image,
            options: options
        )

        // Resolve Nitro optional values
        let format = options.format ?? .jpeg
        let quality = options.quality ?? 90.0

        // Prepare storage
        let store = try ImageStore.prepare(
            format: format
        )

        // Encode cache
        let size = try Encoder.encode(
            image: image,
            output: store.cacheFile,
            format: format,
            quality: quality
        )

        // Persist permanent file
        try ImageStore.persist(
            store
        )

        return ImageResult(
            id: store.id,
            path: store.cacheFile.path,
            permanentPath: store.permanentFile.path,
            width: image.size.width,
            height: image.size.height,
            size: Double(size)
        )
    }
}