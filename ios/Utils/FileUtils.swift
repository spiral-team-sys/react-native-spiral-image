import Foundation

enum FileUtils {

    static func fileSize(
        at url: URL
    ) -> Int64 {

        do {
            let attributes = try FileManager.default.attributesOfItem(
                atPath: url.path
            )

            return attributes[.size] as? Int64 ?? 0

        } catch {
            return 0
        }
    }


    static func exists(
        _ url: URL
    ) -> Bool {

        FileManager.default.fileExists(
            atPath: url.path
        )
    }


    static func remove(
        _ url: URL
    ) {

        guard exists(url) else {
            return
        }

        try? FileManager.default.removeItem(
            at: url
        )
    }


    static func createDirectory(
        _ url: URL
    ) {

        guard !exists(url) else {
            return
        }

        try? FileManager.default.createDirectory(
            at: url,
            withIntermediateDirectories: true
        )
    }
}