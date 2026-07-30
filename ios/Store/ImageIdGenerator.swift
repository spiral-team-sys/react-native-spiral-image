import Foundation

enum ImageIdGenerator {

    static func generate() -> String {
        UUID().uuidString.lowercased()
    }

}