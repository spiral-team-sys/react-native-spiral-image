import Foundation
import UIKit

enum EncoderError: LocalizedError {

    case encodeFailed
    case writeFailed(String)

    var errorDescription: String? {

        switch self {

        case .encodeFailed:
            return "Failed to encode image."

        case .writeFailed(let path):
            return "Failed to write image: \(path)"
        }
    }
}


enum Encoder {

    @discardableResult
    static func encode(
        image: UIImage,
        output: URL,
        format: ImageFormat,
        quality: Double
    ) throws -> UInt64 {

        let directory = output.deletingLastPathComponent()

        try FileManager.default.createDirectory(
            at: directory,
            withIntermediateDirectories: true
        )


        let compression = max(
            0,
            min(1, quality / 100)
        )


        let data: Data


        switch format {

        case .jpeg:

            guard let jpeg = image.jpegData(
                compressionQuality: compression
            ) else {
                throw EncoderError.encodeFailed
            }

            data = jpeg


        case .png:

            guard let png = image.pngData() else {
                throw EncoderError.encodeFailed
            }

            data = png


        case .webp:

            // Phase 1:
            // UIKit chưa hỗ trợ encode WebP native.
            // Temporary fallback JPEG.
            guard let jpeg = image.jpegData(
                compressionQuality: compression
            ) else {
                throw EncoderError.encodeFailed
            }

            data = jpeg
        }


        do {

            try data.write(
                to: output,
                options: .atomic
            )

        } catch {

            throw EncoderError.writeFailed(
                output.path
            )
        }


        let attributes = try FileManager.default.attributesOfItem(
            atPath: output.path
        )


        return (
            attributes[.size] as? NSNumber
        )?.uint64Value ?? 0
    }
}