import Foundation

enum CacheManager {

    static func createFile(
        id: String,
        extension ext: String
    ) throws -> URL {

        let directory = FileManager.default.urls(
            for: .cachesDirectory,
            in: .userDomainMask
        )[0]
        .appendingPathComponent("SpiralImage")
        .appendingPathComponent("cache")

        try FileManager.default.createDirectory(
            at: directory,
            withIntermediateDirectories: true
        )

        return directory.appendingPathComponent(
            "\(id).\(ext)"
        )
    }

}