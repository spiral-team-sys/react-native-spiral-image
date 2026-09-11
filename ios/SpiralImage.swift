import Foundation
import NitroModules

final class SpiralImage: HybridSpiralImageSpec {

    func process(
        options: ProcessOptions
    ) throws -> Promise<ImageResult> {

        return Promise.async {
            try ImagePipeline.execute(
                options: ResizeOptions(
                    input: options.path,
                    output: options.output?.path ?? options.path,
                    width: options.resize?.width,
                    height: options.resize?.height,
                    quality: options.output?.quality,
                    format: options.output?.format.map { format in
                        switch format {
                        case .jpeg:
                            return .jpeg
                        case .png:
                            return .png
                        case .webp:
                            return .webp
                        }
                    }
                )
            )
        }
    }
}