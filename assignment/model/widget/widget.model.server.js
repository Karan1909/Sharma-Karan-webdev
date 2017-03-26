module.exports = function () {

    var q=require('q');

    var model={};
    var mongoose=require('mongoose');
    var WidgetSchema=require("./widget.schema.server")();
    var WidgetModel=mongoose.model('WidgetModel',WidgetSchema);// unique identifier model will allow us to manipulate objects that

    var api={

        "updateWidget": updateWidget,
        "findWidgetById":findWidgetById,
        "findAllWidgetsForPage":findAllWidgetsForPage,
        "createWidget":createWidget,
        "deleteWidget":deleteWidget,
        "reorderWidget":reorderWidget,
        "setModel":setModel
    };
    return api;

    function setModel(_model) {
        model=_model;
    }
    
    function reorderWidget(start,end,pageId) {

        var defferred=q.defer();
        console.log("reorder db");
        WidgetModel.find(
            {
                _page:pageId
            }).then(
                function (widgets,err) {
                    if(err)
                    {
                        defferred.abort(err);
                    }
                    else
                    {
                        widgets.forEach(
                            
                            function (wid) {
                                var s=parseInt(start);
                                var e=parseInt(end);
                                console.log("start "+s);
                                if(s<e)
                                {
                                    if(wid.order===s)
                                    {
                                        wid.order=e;
                                        wid.save();
                                    }
                                    else if(wid.order>s && wid.order<=e)
                                    {
                                        wid.order--;
                                        console.log("end "+e);
                                        wid.save();

                                    }

                                }
                                else
                                {

                                    if(wid.order===s)
                                    {
                                        wid.order=e;
                                        wid.save();
                                    }
                                    else if(wid.order<s && wid.order>=e)
                                    {
                                        wid.order++;
                                        wid.save();
                                    }
                                }});
                        return defferred.resolve(widgets);


                    }
                }

        );
        return defferred.promise;

    }

    function findAllWidgetsForPage(pageId) {

        var deffered=q.defer();
        WidgetModel.find({_page:pageId}).then(
            function(widget,err)
            {
                if(err)
                {

                    deffered.abort(err);
                }
                else
                {
                    deffered.resolve(widget);
                }


            });
        return deffered.promise;
    }


    function createWidget(pageId,newWidget) {

        var deffered=q.defer();
        console.log("create widget service db layer"+newWidget);
        newWidget._page=pageId;
        WidgetModel.find(
            {
                _page:pageId
            }
            ).then( function (widgets,err) {
                    if(err)
                    {
                        deffered.abort(err);
                    }
                    else
                    {
                        var order=widgets.length;
                        newWidget.order=order;
                        WidgetModel.create(newWidget,
                            function (err,newWidget) {
                                if(err)
                                {
                                    console.log("error aaya");
                                    deffered.abort(err);
                                }
                                else
                                {

                                    deffered.resolve(newWidget);
                                }
                            });
                    }});
        return deffered.promise;
    }

 function deleteWidget(widgetId) {

        var deferred=q.defer();
        WidgetModel.remove(
            {_id: widgetId},

            function (err,widget) {
                if(err)
                {
                    deferred.abort(err);
                }
                else
                {
                    deferred.resolve(widget);
                }
            });
     return deferred.promise;
    }


    function updateWidget(widgetId,newWidget) {
        var deferred=q.defer();
        if(newWidget.type=="HEADING")
        {
            WidgetModel.update(
                {_id:widgetId},
                {
                    name:newWidget.name,
                    type:newWidget.type,
                    text:newWidget.text,
                    order:newWidget.order,
                    size:newWidget.size,
                    _page:newWidget._page,
                    dateCreated:newWidget.dateCreated
                }).then(
                    function (widget,err) {
                        if(err)
                        {
                            deferred.abort(err);
                        }
                        else
                        {
                            deferred.resolve(widget);
                        }
                    }

            );
            return deferred.promise;
        }
        else if(newWidget.type=="HTML")
        {
            WidgetModel.update(
                {_id:widgetId},
                {

                    type:newWidget.type,
                    text:newWidget.text,
                    order:newWidget.order,
                    _page:newWidget._page,
                    dateCreated:newWidget.dateCreated
                }).then(
                function (widget,err) {
                    if(err)
                    {
                        deferred.abort(err);
                    }
                    else
                    {
                        deferred.resolve(widget);
                    }
                }

            );

            return deferred.promise;
        }
        else if(newWidget.type=="IMAGE")
        {
            WidgetModel.update(
                {_id:widgetId},
                {

                    name:newWidget.name,
                    type:newWidget.type,
                    text:newWidget.text,
                    width:newWidget.width,
                    //order:newWidget.order,
                    url:newWidget.url,
                    _page:newWidget._page,
                    dateCreated:newWidget.dateCreated
                }).then(
                function (widget,err) {
                    if(err)
                    {
                        deferred.abort(err);
                    }
                    else
                    {
                        deferred.resolve(widget);
                    }
                });
            return deferred.promise;
        }

        else if(newWidget.type=="YOUTUBE")
        {
            WidgetModel.update(
                {_id:widgetId},
                {

                    name:newWidget.name,
                    type:newWidget.type,
                    text:newWidget.text,
                    url:newWidget.url,
                    order:newWidget.order,
                    width:newWidget.width,
                    dateCreated:newWidget.dateCreated
                }).then(
                function (widget,err) {
                    if(err)
                    {
                        deferred.abort(err);
                    }
                    else
                    {
                        deferred.resolve(widget);
                    }});
            return deferred.promise;
        }

        else if(newWidget.type=="TEXT")
        {
            console.log("db inside of text"+newWidget.type);
            WidgetModel.update(
                {_id:widgetId
                },
                {

                    name:newWidget.name,
                    type:newWidget.type,
                    text:newWidget.text,
                    url:newWidget.url,
                   order:newWidget.order,
                    placeholder:newWidget.placeholder,
                    rows:newWidget.rows,
                    formatted:newWidget.formatted,
                    width:newWidget.width,
                    dateCreated:newWidget.dateCreated
                }).then(
                function (widget,err) {
                    if(err)
                    {
                        deferred.abort(err);
                    }
                    else
                    {
                        deferred.resolve(widget);
                    }});

            return deferred.promise;
        }}
        
        function findWidgetById(widgetId) {
        var deferred=q.defer();
        WidgetModel.findById(widgetId).then(
            function (widget,err) {
                if(err)
                {
                    deferred.abort(err);
                }
                else
                {
                    deferred.resolve(widget);
                }});
            return deferred.promise;
  }



};