import SwiftUI
import SDWebImageSwiftUI
import OSLog

struct BlogView: View {
    
    let id: Int
    
    @State private var page: PageModel? = nil
    
    var body: some View {
        
        ZStack {
            
            if let page = page {
                
                NavigationLink(destination: DetailBlogView(page)) {
                    
                    AnimatedImage(url: URL(string: page.image?.downloadLink ?? ""), isAnimating: .constant(true))
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
                
                AnimatedImage(url: URL(string: page.image?.downloadLink ?? ""), isAnimating: .constant(true))
                    .resizable()
                    .frame(width: 325, height: 140)
                
                Text(page.englishInfo?.content ?? "")
            }
            .padding()
        }
        .navigationTitle(page.englishInfo?.title ?? "")
    }
}

#Preview {
    ContentView()
}
