(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    function PageService() {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 4", "websiteId": "456", "description": "Lorem" }
            ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function updatePage(pageId,page) {

            for(var u in pages)
            {
                if(pages[u]._id==pageId)
                {
                    pages[u].name=page.name;
                    pages[u].description=page.description;
                    pages[u].title=page.title;
                    return angular.copy(pages[u]);
                }

            }
            return null;
        }

        function findPageById(pid) {
            for(var w in pages) {
                if(pages[w]._id === pid) {
                    return angular.copy(pages[w]);
                }
            }
            return null;
        }
        function deletePage(pageId) {
            for(var w in pages) {
                if(pages[w]._id === pageId) {
                    pages.splice(w, 1);
                }
            }
        }

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime();
            page.name="New page";
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var multipages = [];
            for(var w in pages) {
                if(pages[w].websiteId === websiteId) {
                    multipages.push(pages[w]);
                }
            }
            return multipages;
        }
        return null;
    }
})();
