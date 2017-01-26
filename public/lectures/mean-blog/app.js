/**
 * Created by kkara on 1/18/2017.
 */
angular.module('BlogApp',[]).controller('BlogController',BlogController);

function BlogController($scope) {
    $scope.blogPosts=[];
    $scope.createPost=createPost;
    $scope.deletePost=deletePost;
    $scope.deleteAllPosts=deleteAllPosts;
    $scope.selectPost=selectPost;
    $scope.post={};
    $scope.editPost=editPost;

    function editPost(post)
    {
        var changeIndex=$scope.indexPost;
        $scope.blogPosts[changeIndex].title=post.title;
        $scope.blogPosts[changeIndex].content=post.content;
        $scope.post={};

    }
    function createPost(post) {
        var newPost={
            title: post.title,
            content: post.content
    };
        $scope.blogPosts.push(newPost);
    }

    function deletePost(post) {
       var indexPost= $scope.blogPosts.indexOf(post);
        $scope.blogPosts.splice(indexPost,1);

    }
    function deleteAllPosts() {
        $scope.blogPosts=[];


    }

    function selectPost(post) {
        $scope.indexPost=$scope.blogPosts.indexOf(post);
        $scope.post.title=post.title;
        $scope.post.content=post.content;
    }

}