import Foundation

final class SpiralImage: HybridSpiralImageSpec {

    func resize(
        options: ResizeOptions
    ) throws -> ImageResult {

        return try ImagePipeline.execute(
            options: options
        )
    }
}