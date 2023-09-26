import Foundation

protocol ContentLanguage {
    
    var localizeInfos: [String : InfoModel]? { get set }
    var attributeValues: [String : [String : AttributeModel]]? { get set }
    
    func getContent(_ language: AppViewModel.ContentLanguage) -> InfoModel?
    
    func getImage(_ language: AppViewModel.ContentLanguage) -> ImageModel?
    func getPrice(_ language: AppViewModel.ContentLanguage) -> Double?
    func getRate(_ language: AppViewModel.ContentLanguage) -> Double?
}

extension ContentLanguage {
    
    func getContent(_ language: AppViewModel.ContentLanguage) -> InfoModel? {
        
        localizeInfos?[language.rawValue]
    }
    
    func getImage(_ language: AppViewModel.ContentLanguage) -> ImageModel? {
        
        let images = attributeValues?[language.rawValue]?["image"]?.value as? [ImageModel]
        
        return images?.first
    }
    
    func getPrice(_ language: AppViewModel.ContentLanguage) -> Double? {
        
        attributeValues?[language.rawValue]?["price"]?.value as? Double
    }
    
    func getRate(_ language: AppViewModel.ContentLanguage) -> Double? {
        
        attributeValues?[language.rawValue]?["rate"]?.value as? Double
    }
}
