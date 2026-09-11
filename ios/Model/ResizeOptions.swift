import Foundation

public struct ImageResizeOptions {

    public let input: String
    public let output: String

    public let width: Double?
    public let height: Double?

    public let quality: Double?
    public let format: ImageFormat?
    public let keepAspectRatio: Bool

    public init(
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