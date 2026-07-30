import UIKit

enum DecoderError: LocalizedError {
    case fileNotFound(String)
    case cannotDecode(String)

    var errorDescription: String? {
        switch self {
        case .fileNotFound(let path):
            return "Image does not exist: \(path)"

        case .cannotDecode(let path):
            return "Failed to decode image: \(path)"
        }
    }
}

enum Decoder {

    static func decode(
        _ input: String
    ) throws -> UIImage {

        let path = input
            .replacingOccurrences(of: "file://", with: "")
            .replacingOccurrences(of: "file:", with: "")

        guard FileManager.default.fileExists(atPath: path) else {
            throw DecoderError.fileNotFound(path)
        }

        guard let image = UIImage(contentsOfFile: path) else {
            throw DecoderError.cannotDecode(path)
        }

        return image
    }
}