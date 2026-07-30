import Foundation

public struct ImageResult {

    public let id: String
    public let path: String
    public let permanentPath: String
    public let width: Double
    public let height: Double
    public let size: Double

    public init(
        id: String,
        path: String,
        permanentPath: String,
        width: Double,
        height: Double,
        size: Double
    ) {
        self.id = id
        self.path = path
        self.permanentPath = permanentPath
        self.width = width
        self.height = height
        self.size = size
    }
}