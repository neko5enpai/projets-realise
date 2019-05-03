var Datalist = (function($) {

    var selected_page = 1;

    var load_data_list_url        = "";
    var delete_datafile_url       = "";
    var resume_datafile_url       = "";
    var load_datafile_history_url = "";
    var download_datafile_url     = "";
    var relative_location         = null;

    var show_history = true;
    var show_delete  = true;

    function start(resId, params)
    {
        selected_page = 1;

        load_data_list_url        = params.load_data_list_url;
        delete_datafile_url       = params.delete_datafile_url;
        resume_datafile_url       = params.resume_datafile_url;
        load_datafile_history_url = params.load_datafile_history_url;
        download_datafile_url     = params.download_datafile_url;

        if (typeof(params.relative_location) != "undefined") {
            relative_location         = params.relative_location;
        }

        if (typeof(params.show_history) != "undefined") {
            show_history = params.show_history;
        }

        if (typeof(params.show_delete) != "undefined") {
            show_delete = params.show_delete;
        }

        load_data_list(resId);
        register_pagination_change(resId);
    }

    function format_datetime(date, locale)
    {
        var d = "";

        locale = locale.toLowerCase().replace("-", "_");

        if(locale == "fr_ch")
        {
            d += date.toLocaleString("fr-ch", {"day" : "2-digit", "month" : "2-digit", "year" : "numeric"});
            d += " ";
            d += date.toLocaleString("fr-ch", {"hour" : "2-digit", "minute" : "2-digit"});;
        }
        else if(locale == "de_ch")
        {
            d += date.toLocaleString("fr-ch", {"day" : "2-digit", "month" : "2-digit", "year" : "numeric"});
            d += ", ";
            d += date.toLocaleString("fr-ch", {"hour" : "2-digit", "minute" : "2-digit"});;
        }
        else
        {
           /*
            * default format is the Swiss one
            */
            d += date.toLocaleString("fr-ch", {"day" : "2-digit", "month" : "2-digit", "year" : "numeric"});
            d += ", ";
            d += date.toLocaleString("fr-ch", {"hour" : "2-digit", "minute" : "2-digit"});;
        }

        return d;
    }

    function load_data_list(resId)
    {
        var limit = $("#files_pagination").val();

        var url = load_data_list_url + "/" + resId + "?limit=" + limit + "&page=" + selected_page;
        if (relative_location != null) {
            url += "&relativeLocation=" + relative_location;
        }

        $.ajax({
            url : url,
            type : "get",
            beforeSend: function( xhr ) {
                $("#data_list").html('<img src="/demo/img/big_loader.gif" alt=""/>');
            }
        })
        .done(function( data, textStatus, jqXHR ) {

            var element_text = data._page.totalItems > 1 ? "elements" : "element";

            $("#data_total").html(data._page.totalItems + " " + element_text);

            var list = format_data_list(resId, data);
            list += format_pagination_links(data)

            if (show_history) {
                list += format_modal_history(data);
            }

            list += format_modal_file_infos(data);

            $("#data_list").html(list);

            register_pagination_links(resId);
            register_delete_datafile();
            register_resume_datafile();

            if (show_history) {
                register_data_history_load();
            }
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            if (jqXHR.status == 403) {
                location.reload(true);
            } else {
                alert("an error occured");
            }
        })
        .always(function(jqXHR, textStatus, errorThrown ) {

        });
    }

    function register_delete_datafile()
    {
        $(".delete-datafile").click(function(e){
            var datafile_id = $(this).attr("data-datafile-id");
            var deposit_id  = $(this).attr("data-deposit-id");
            delete_datafile(deposit_id, datafile_id);
            return false;
        });
    }

    function register_resume_datafile()
    {
        $(".resume-datafile").click(function(e){
            var datafile_id = $(this).attr("data-datafile-id");
            var deposit_id  = $(this).attr("data-deposit-id");
            resume_datafile(deposit_id, datafile_id);
            return false;
        });
    }

    function register_pagination_change(resId)
    {
        $("#files_pagination").change(function(e){
            selected_page = 1;
            load_data_list(resId);
        });
    }

    function register_pagination_links(resId)
    {
        $(".page-link").click(function(e){
            var page = $(this).attr("data-page");
            navigateTo(page, resId);
            return false;
        });

        $(".disabled a").click(function(){return false;});
    }

    function register_data_history_load()
    {
        $("a.show-datafile-history").each(function(index, element){

            /*
            var clickedBtn = e.relatedTarget;
            var datafileId = $(clickedBtn).prop("data-datafile-id");
            */

            $("#historyModal" + index).on('show.bs.modal', function (e) {
                var clickedBtn      = e.relatedTarget;
                var datafile_resid = $(clickedBtn).attr("data-datafile-id");
                var deposit_resid  = $(clickedBtn).attr("data-deposit-id");

                $.ajax({
                    url : load_datafile_history_url + "/" + deposit_resid + "/" + datafile_resid,
                    type : "get",
                    beforeSend: function( xhr ) {
                        xhr.setRequestHeader("X-CSRF-Token", $("input[name=csrfToken]").val());
                        $("#datafile-history-small-loader-" + datafile_resid).show();
                    }
                })
                .done(function( data, textStatus, jqXHR ) {
                    //load_data_list(deposit_resid);

                    var html = "";

                    if(typeof(data._data) != "undefined") {
                        $(data._data).each(function(index, hist){
                            html += '<div class="row">';
                            html += '   ';
                            html += '   <div class="col-xs-6 col-sm-3 col-md-3">';

                            var changeTime = new Date(hist.changeTime);
                            html +=     format_datetime(changeTime, "en-en");

                            html += '   </div>';
                            html += '   ';
                            html += '   <div class="col-xs-6 col-sm-3 col-md-3">';
                            html +=     hist.status;
                            html += '   </div>';
                            html += '   ';
                            html += '   <div class="col-xs-11 col-xs-offset-1 col-sm-6 col-sm-offset-0 col-md-6">';
                            html +=     hist.description;
                            html += '   </div>';
                            html += '   ';
                            html += '</div>';
                        });
                    } else {
                        html += 'history is not available';
                    }

                    $("#historyModal" + index + "_list").html(html);
                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                    if(typeof(jqXHR.responseJSON.error) != "undefined") {
                        alert(jqXHR.responseJSON.error);
                    } else if (jqXHR.status == 403) {
                        location.reload(true);
                    } else {
                        alert("an error occured");
                    }
                })
                .always(function(jqXHR, textStatus, errorThrown ) {
                    $("#datafile-history-small-loader-" + datafile_resid).hide();
                });

                //$("#historyModal" + index + "_list").html(datafileId);
            });
        });
    }

    function delete_datafile(deposit_resid, datafile_resid)
    {
        $.ajax({
            url : delete_datafile_url + "/" + deposit_resid + "/" + datafile_resid,
            type : "post",
            beforeSend: function( xhr ) {
                xhr.setRequestHeader("X-CSRF-Token", $("input[name=csrfToken]").val());
                $("#datafile-small-loader-" + datafile_resid).show();
            }
        })
        .done(function( data, textStatus, jqXHR ) {
            load_data_list(deposit_resid);
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            if(typeof(jqXHR.responseJSON.error) != "undefined") {
                alert(jqXHR.responseJSON.error);
            } else if (jqXHR.status == 403) {
                location.reload(true);
            } else {
                alert("an error occured");
            }
        })
        .always(function(jqXHR, textStatus, errorThrown ) {
            $("#datafile-small-loader-" + datafile_resid).hide();
        });
    }

    function resume_datafile(deposit_resid, datafile_resid)
    {
        if(confirm("Are you sure you want to resume the file treatment ?")) {

            $.ajax({
                url : resume_datafile_url + "/" + deposit_resid + "/" + datafile_resid,
                type : "post",
                beforeSend: function( xhr ) {
                    xhr.setRequestHeader("X-CSRF-Token", $("input[name=csrfToken]").val());
                    $("#datafile-small-loader-" + datafile_resid).show();
                }
            })
            .done(function( data, textStatus, jqXHR ) {
                load_data_list(deposit_resid);
            })
            .fail(function( jqXHR, textStatus, errorThrown ) {
                if(typeof(jqXHR.responseJSON) != "undefined" && typeof(jqXHR.responseJSON.error) != "undefined") {
                    alert(jqXHR.responseJSON.error);
                } else if (jqXHR.status == 403) {
                    location.reload(true);
                } else {
                    alert("an error occured");
                }
            })
            .always(function(jqXHR, textStatus, errorThrown ) {
                $("#datafile-small-loader-" + datafile_resid).hide();
            });
        }
    }

    function navigateTo(page, resId)
    {
        selected_page = page;
        load_data_list(resId);
    }

    function format_data_list(deposit_resid, data)
    {
        var list = "";

        if(typeof(data._page != "undefined") && typeof(data._page) != "undefined") {

            var _data = data._data;
            var _page = data._page;

            list += "<div class=\"files-list\">";

            $(_data).each(function(index, file){

                if(file.status != "IN_ERROR") {
                    list += "<div class=\"row\">";
                } else {
                    list += "<div class=\"row error\">";
                }

                //var href      = (typeof(file._links.download) != "undefined" && typeof(file._links.download.href) != "undefined") ? file._links.download.href : file.sourceData;
                var href      = download_datafile_url + "/" + deposit_resid + "/" + file.resId;
                var filename  = (typeof(file.fileName != "undefined")) ? file.fileName : href;
                var smartSize = (typeof(file.smartSize != "undefined") && file.smartSize != "0.0 B") ? " (" + file.smartSize + ")" : "";

                list += "<div class=\"col-md-4\">";
                list += "<a class=\"glyphicon glyphicon-info-sign\" href=\"#\" data-toggle=\"modal\" data-target=\"#fileInfosModal" + index + "\" alt=\"file infos\" title=\"file infos\"></a>";
                list += "&nbsp;&nbsp;";
                list += "<a href=\"" + href + "\" target=\"_blank\">" + filename + smartSize + "</a>";
                list += "</div>";

                list += "<div class=\"col-md-3\">";
                list += format_datetime(new Date(file.creation.when), "en-en");
                if (show_history) {
                    list += " <a class=\"glyphicon glyphicon-calendar show-datafile-history\" href=\"#\" data-toggle=\"modal\" data-target=\"#historyModal" + index + "\" data-deposit-id=\"" + deposit_resid + "\" data-datafile-id=\"" + file.resId + "\" alt=\"history\" title=\"history\"></a>";
                }
                list += "</div>";

                if(file.status == "IN_ERROR") {
                    list += "<div class=\"col-md-2 error\">";
                } else {
                    list += "<div class=\"col-md-2\">";
                }
                list += file.status;

                if(typeof(file._links.resume) != "undefined") {
                    list += " <a class=\"glyphicon glyphicon-repeat resume-datafile\" href=\"#\" data-datafile-id=\"" + file.resId + "\" data-deposit-id=\"" + deposit_resid + "\" alt=\"resume\" title=\"resume\"></a>";
                }

                list += "</div>";

                list += "<div class=\"col-md-2\">";

                list += get_compliance_graphical_level(file);

                list += "</div>";

                if (show_delete) {
                    list += "<div class=\"col-md-1\">";
                    list += "<a class=\"glyphicon glyphicon-trash delete-datafile\" href=\"#\" data-datafile-id=\"" + file.resId + "\" data-deposit-id=\"" + deposit_resid + "\"></a>";
                    list += "<img src=\"/demo/img/small-ajax-loader.gif\" id=\"datafile-small-loader-" + file.resId + "\" style=\"display:none\">";
                    list += "</div>";
                }

                list += "</div>";
            });

            list += "</div>";
        }

        return list;
    }

    function get_compliance_graphical_level(file)
    {
        var html = "";

        if (typeof(file.complianceLevel) != "undefined") {

            var complianceLevel  = 0;
            var complianceLevels = 3;
            var complianceDescription = get_compliance_level_description(file.complianceLevel);

            if (file.complianceLevel == "WEAK_COMPLIANCE") {
                complianceLevel  = 1;
            } else if (file.complianceLevel == "AVERAGE_COMPLIANCE") {
                complianceLevel  = 2;
            } else if (file.complianceLevel == "FULL_COMPLIANCE") {
                complianceLevel  = 3;
            }

            html += "<div title=\"" + complianceDescription + "\">";
            if (complianceLevel == 0) {
                html += "-";
            } else {
                for (i = 0; i < complianceLevels; i++) {
                    if (complianceLevel > i) {
                        html += "<span class=\"glyphicon glyphicon-star\"></span>";
                    } else {
                        html += "<span class=\"glyphicon glyphicon-star-empty\"></span>";
                    }
                }
            }

            html += "</div>";
        }

        return html;
    }

    function format_pagination_links(data)
    {
        var pagination = "";

        if(typeof(data._page != "undefined")) {

            var _page = data._page;

            if(_page.totalPages > 1) {
                pagination += "<div class=\"text-center\">";
                pagination += "<nav aria-label=\"Page navigation\">";
                pagination += "<ul class=\"pagination\">";

                var previous_page = selected_page - 1;
                if(previous_page > 0){
                    pagination += "  <li>";
                    pagination += "    <a href=\"#\" aria-label=\"Previous\" class=\"page-link\" data-page=\"" + previous_page + "\">";
                } else {
                    pagination += "  <li class=\"disabled\">";
                    pagination += "    <a href=\"#\" aria-label=\"Previous\">";
                }
                pagination += "      <span aria-hidden=\"true\">&laquo;</span>";
                pagination += "    </a>";
                pagination += "  </li>";

                var start_pages   = [1, 2, 3];
                var end_pages     = [_page.totalPages - 2, _page.totalPages - 1, _page.totalPages];
                var middle_pages  = [parseInt(selected_page) - 2, parseInt(selected_page) - 1, parseInt(selected_page) , parseInt(selected_page) + 1, parseInt(selected_page) + 2];
                var pages_to_show = start_pages.concat(end_pages).concat(middle_pages);

                var previous_is_dot = false;
                for (i = 1; i <= _page.totalPages; i++) {
                    if (pages_to_show.indexOf(i) > -1) {
                        if(i == selected_page) {
                            pagination += "<li class=\"active\"><a href=\"#\" class=\"page-link\" data-page=\"" + i + "\">" + i + "</a></li>";
                        } else {
                            pagination += "<li><a href=\"#\" class=\"page-link\" data-page=\"" + i + "\">" + i + "</a></li>";
                        }
                        previous_is_dot = false;
                    } else {
                        if (!previous_is_dot) {
                            pagination += "<li><a href=\"#\">...</a></li>";
                            previous_is_dot = true;
                        }
                    }
                }

                var next_page = parseInt(selected_page) + 1;
                if(next_page <= _page.totalPages){
                    pagination += "  <li>";
                    pagination += "    <a href=\"#\" aria-label=\"Next\" class=\"page-link\" data-page=\"" + next_page + "\">";
                } else {
                    pagination += "  <li class=\"disabled\">";
                    pagination += "    <a href=\"#\" aria-label=\"Next\">";
                }

                pagination += "      <span aria-hidden=\"true\">&raquo;</span>";
                pagination += "    </a>";
                pagination += "  </li>";


                pagination += "</ul>";
                pagination += "</nav>";
                pagination += "</div>";
            }
        }

        return pagination;
    }

    function format_modal_history(data)
    {
        var html = "";

        if(typeof(data._page != "undefined") && typeof(data._page) != "undefined") {

            var _data = data._data;
            var _page = data._page;

            $(_data).each(function(index, file){

                html += '<div class="modal fade" id="historyModal' + index + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
                html += '  <div class="modal-dialog modal-lg" role="document">';
                html += '    <div class="modal-content">';


    //             html += '      <div class="modal-header">';
    //             html += '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    //             html += '        <h4 class="modal-title" id="myModalLabel">File history</h4>';
    //             html += '      </div>';

                html += '      <div class="modal-body">';

                html += '      <h4>File history</h4>';

                html += '<div class="row" style="color:#888;">';
                html += '   ';
                html += '   <div class="col-xs-6 col-sm-3 col-md-3">';
                html += '   Date';
                html += '   </div>';
                html += '   ';
                html += '   <div class="col-xs-6 col-sm-3 col-md-3">';
                html += '   Status';
                html += '   </div>';
                html += '   ';
                html += '   <div class="col-xs-11 col-xs-offset-1 col-sm-6 col-sm-offset-0 col-md-6">';
                html += '   Message';
                html += '   </div>';
                html += '   ';
                html += '</div>';

                html += "<div class=\"history\" id=\"historyModal" + index + "_list\">";

                html += "<img src=\"/demo/img/small-ajax-loader.gif\" id=\"datafile-history-small-loader-" + file.resId + "\" style=\"display:none\">";

                /*
                if(typeof(file.history != "undefined") && typeof(file.history) != "undefined") {
                    $(file.history).each(function(index, hist){
                        html += '<div class="row">';
                        html += '   ';
                        html += '   <div class="col-xs-6 col-sm-3 col-md-3">';

                        var changeTime = new Date(hist.changeTime);
                        html +=     format_datetime(changeTime, "en-en");

                        html += '   </div>';
                        html += '   ';
                        html += '   <div class="col-xs-6 col-sm-3 col-md-3">';
                        html +=     hist.status;
                        html += '   </div>';
                        html += '   ';
                        html += '   <div class="col-xs-11 col-xs-offset-1 col-sm-6 col-sm-offset-0 col-md-6">';
                        html +=     hist.description;
                        html += '   </div>';
                        html += '   ';
                        html += '</div>';
                    });
                } else {
                    html += 'history is not available';
                }
                */

                html += '</div>';

                html += '      </div>';

                html += '      <div class="modal-footer">';
                html += '        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
                html += '      </div>';


                html += '    </div>';
                html += '  </div>';
                html += '</div>';
            });
        }

        return html;
    }

    function format_modal_file_infos(data)
    {
        var html = "";

        if(typeof(data._page != "undefined") && typeof(data._page) != "undefined") {

            var _data = data._data;
            var _page = data._page;

            $(_data).each(function(index, file){

                /*
                 * Prevent some JS errors below
                 */
                if (typeof(file.fileFormat) == "undefined" || file.fileFormat == null) {
                    file.fileFormat = [];
                }
                if (typeof(file.fileFormat.tool) == "undefined" || file.fileFormat.tool == null) {
                    file.fileFormat.tool = [];
                }

                html += '<div class="modal fade" id="fileInfosModal' + index + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
                html += '  <div class="modal-dialog modal-lg" role="document">';
                html += '    <div class="modal-content">';

                html += '      <div class="modal-body">';

                html += '      <h4 style="padding:3px;background-color:#efefef;">File infos</h4>';

                html += '      <dl class="dl-horizontal">';

                    html += format_nullable_list_item("Filename",       file.fileName);
                    html += format_nullable_list_item("Location",       file.relativeLocation);
                    html += format_nullable_list_item("Size",           file.smartSize);
                    html += format_nullable_list_item("Data category",  file.dataCategory);
                    html += format_nullable_list_item("Data type",      file.dataType);
                    html += format_nullable_list_item("MimeType",       file.fileFormat.contentType);
                    html += format_nullable_list_item("Format",         file.fileFormat.format);

                    var puidValue = null;
                    if (typeof(file.fileFormat.puid) != "undefined" && file.fileFormat.puid != null) {
                        var pronomUrl = "https://www.nationalarchives.gov.uk/PRONOM/{format_id}".replace("{format_id}", file.fileFormat.puid);
                        puidValue = '<a href="' + pronomUrl + '" target="_blank">' + file.fileFormat.puid + '</a>'
                    }
                    html += format_nullable_list_item("Puid",           puidValue);

                    html += '      <dt>Checksums</dt>';
                    html += '      <dd>';
                    $(file.checksums).each(function(index, checksum){
                        html += checksum.checksumAlgo + ": " + checksum.checksum + "<br/>";
                    });
                    html += '      </dd>';

                html += '      </dl>';

                /*********************************************************/

                html += '      <h4 style="padding:3px;background-color:#efefef;">Compliance level</h4>';

                html += '      <dl class="dl-horizontal">';

                    html += format_nullable_list_item("Level",    get_compliance_graphical_level(file) + " " + get_compliance_level_description(file.complianceLevel));

                html += '      </dl>';

                /*********************************************************/

                html += '      <h4 style="padding:3px;background-color:#efefef;">Analytical tool</h4>';

                html += '      <dl class="dl-horizontal">';

                    html += format_nullable_list_item("Description",    file.fileFormat.tool.description);
                    html += format_nullable_list_item("Tool name",      file.fileFormat.tool.name);
                    html += format_nullable_list_item("Tool puid",      file.fileFormat.tool.puid);
                    html += format_nullable_list_item("Version",        file.fileFormat.tool.version);

                html += '      </dl>';

                /*********************************************************/

                html += '      <h4 style="padding:3px;background-color:#efefef;">Antivirus</h4>';

                if (file.virusCheck != null) {

                    html += '      <dl class="dl-horizontal">';

                    html += format_nullable_list_item("Description",    file.virusCheck.tool.description);
                    html += format_nullable_list_item("Tool name",      file.virusCheck.tool.name);
                    html += format_nullable_list_item("Tool puid",      file.virusCheck.tool.puid);

                    html += format_nullable_list_item("Version",        file.virusCheck.tool.version);

                    if (file.virusCheck.checkDate != null && typeof(file.virusCheck.checkDate) != "undefined") {
                        html += format_nullable_list_item("Checkdate",      format_datetime(new Date(file.virusCheck.checkDate), "en-en"));
                    } else {
                        html += format_nullable_list_item("Checkdate",  "-");
                    }

                    html += format_nullable_list_item("Details",        file.virusCheck.details);

                    html += '      </dl>';
                } else {
                    html += "no antivirus information yet";
                }

                /*********************************************************/

                html += '       <hr/>';

                html += '      <dl class="dl-horizontal">';

                    html += '        <dt>Last update</dt>';
                    html += '        <dd>' + format_datetime(new Date(file.creation.when), "en-en") + '</dd>';

                html += '      </dl>';

                html += '      </div>';

                html += '      <div class="modal-footer">';
                html += '        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
                html += '      </div>';

                html += '    </div>';
                html += '  </div>';
                html += '</div>';
            });
        }

        return html;
    }

    function format_nullable_list_item(title, value)
    {
        var item = "";

        item += "<dt>" + title + "</dt>";
        item += "<dd>";

        if (typeof(value) != "undefined" && value != null) {
            item += value;
        } else {
            item += "-";
        }
        item += "</dd>";

        return item;
    }

    function get_compliance_level_description(complianceLevel)
    {
        var complianceDescription = "";

        if (complianceLevel == "NOT_ASSESSED") {
            complianceDescription = "compliance is unknown for the moment";
        } else if (complianceLevel == "NO_COMPLIANCE") {
            complianceDescription = "not compliant";
        } else if (complianceLevel == "WEAK_COMPLIANCE") {
            complianceDescription = "weak compliance";
        } else if (complianceLevel == "AVERAGE_COMPLIANCE") {
            complianceDescription = "average compliance";
        } else if (complianceLevel == "FULL_COMPLIANCE") {
            complianceDescription = "full compliance";
        }

        return complianceDescription;
    }

    /********************************************************************
     * Return public variables and methods
     */
    return {
        start                       : start,
        load_data_list              : load_data_list,
        format_datetime             : format_datetime,
        register_pagination_change  : register_pagination_change,
        register_pagination_links   : register_pagination_links,
        register_delete_datafile    : register_delete_datafile,
        register_resume_datafile    : register_resume_datafile,

        navigateTo                  : navigateTo,
        delete_datafile             : delete_datafile,
        resume_datafile             : resume_datafile,

        format_data_list            : format_data_list,
        format_pagination_links     : format_pagination_links,
        format_modal_history        : format_modal_history,
        format_modal_file_infos     : format_modal_file_infos,

        get_compliance_level_description    :   get_compliance_level_description,
        get_compliance_graphical_level      :   get_compliance_graphical_level,

        selected_page               : selected_page
    }

})(jQuery);