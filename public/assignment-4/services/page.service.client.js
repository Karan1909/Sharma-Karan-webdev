(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    function PageService($http) {
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
            return $http.put("/api/page/"+pageId,page);


        }

        function findPageById(pid) {

            return $http.get("/api/page/"+pid);

            // for(var w in pages) {
            //     if(pages[w]._id === pid) {
            //         return angular.copy(pages[w]);
            //     }
            // }
            // return null;
        }
        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);


        }

        function createPage(websiteId, paged) {

            return $http.post("/api/website/"+websiteId+"/page",paged);

            // paged._id = (new Date()).getTime().toString();
            // paged.websiteId=websiteId;
            // pages.push(paged);
        }

        function findPageByWebsiteId(websiteId) {

            return $http.get("/api/website/"+websiteId+"/page");
            // var multipages = [];
            // for(var w in pages) {
            //     if(pages[w].websiteId === websiteId) {
            //         multipages.push(pages[w]);
            //     }
            // }
            // return multipages;
        }

    }
})();
