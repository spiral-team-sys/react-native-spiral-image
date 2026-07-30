import Foundation

enum SpiralFileManager {

    static func createResizeFile(
        id: String,
        extension ext: String
    ) throws -> URL {

        let directory = FileManager.default.urls(
            for: .documentDirectory,
            in: .userDomainMask
        )[0]
        .appendingPathComponent("SpiralImage")
        .appendingPathComponent("images")

        try FileManager.default.createDirectory(
            at: directory,
            withIntermediateDirectories: true
        )

        return directory.appendingPathComponent(
            "\(id).\(ext)"
        )
    }

}