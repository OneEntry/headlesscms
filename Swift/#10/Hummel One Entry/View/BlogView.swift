import SwiftUI
import SDWebImageSwiftUI
import OSLog

struct BlogView: View {
    
    let id: Int
    
    @State private var page: PageModel? = nil
    
    @Environment(\.contentLanguage) var language
    
    var body: some View {
        
        ZStack {
            
            if let page = page {
                
                NavigationLink(destination: DetailBlogView(page)) {
                    
                    AnimatedImage(url: URL(string: page.getImage(language)?.downloadLink ?? ""), isAnimating: .constant(true))
                        .resizable()
                        .frame(width: 325, height: 140)
                }
            }
        }
        .task {
            
            do {
                
                let page: PageModel = try await OneEntryProvider.getItems(id, endpoint: .id)
                
                DispatchQueue.main.async {
                    
                    withAnimation {
                        
                        self.page = page
                    }
                }
                
            } catch {
                
                Logger().error("\(error)")
            }
        }
    }
    
    @ViewBuilder
    private func DetailBlogView(_ page: PageModel) -> some View {
        
        ScrollView {
            
            VStack {
                
                AnimatedImage(url: URL(string: page.getImage(language)?.downloadLink ?? ""), isAnimating: .constant(true))
                    .resizable()
                    .frame(width: 325, height: 140)
                
                Text(page.getContent(language)?.content ?? "")
            }
            .padding()
        }
        .navigationTitle(page.getContent(language)?.title ?? "")
    }
}

#Preview {
    ContentView()
}
