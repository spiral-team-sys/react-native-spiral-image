import Foundation

struct ImageStoreResult {

    let id: String

    let cacheFile: URL

    let permanentFile: URL

}

enum ImageStore {

    static func prepare(
        format: ImageFormat
    ) throws -> ImageStoreResult {

        let id = ImageIdGenerator.generate()

        let ext: String

        switch format {

        case .jpeg:
            ext = "jpg"

        case .png:
            ext = "png"

        case .webp:
            ext = "webp"
        }

        return ImageStoreResult(

            id: id,

            cacheFile: try CacheManager.createFile(
                id: id,
                extension: ext
            ),

            permanentFile: try SpiralFileManager.createResizeFile(
                id: id,
                extension: ext
            )
        )
    }

    static func persist(
        _ result: ImageStoreResult
    ) throws {

        if FileManager.default.fileExists(
            atPath: result.permanentFile.path
        ) {

            try FileManager.default.removeItem(
                at: result.permanentFile
            )

        }

        try FileManager.default.copyItem(
            at: result.cacheFile,
            to: result.permanentFile
        )

    }

}