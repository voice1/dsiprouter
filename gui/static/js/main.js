$(function() {
  var accordionActive = false;

  $(window).on('resize', function() {
    var windowWidth = $(window).width();
    var $topMenu = $('#top-menu');
    var $sideMenu = $('#side-menu');

    if (windowWidth < 768) {
      if ($topMenu.hasClass("active")) {
        $topMenu.removeClass("active");
        $sideMenu.addClass("active");

        var $ddl = $('#top-menu .movable.dropdown');
        $ddl.detach();
        $ddl.removeClass('dropdown');
        $ddl.addClass('nav-header');

        $ddl.find('.dropdown-toggle').removeClass('dropdown-toggle').addClass('link');
        $ddl.find('.dropdown-menu').removeClass('dropdown-menu').addClass('submenu');

        $ddl.prependTo($sideMenu.find('.accordion'));
        $('#top-menu #qform').detach().removeClass('navbar-form').prependTo($sideMenu);

        if (!accordionActive) {
          var Accordion2 = function(el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;

            // Variables privadas
            var links = this.el.find('.movable .link');
            // Evento
            links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
          };

          Accordion2.prototype.dropdown = function(e) {
            var $el = e.data.el;
            $this = $(this);
            $next = $this.next();

            $next.slideToggle();
            $this.parent().toggleClass('open');

            if (!e.data.multiple) {
              $el.find('.movable .submenu').not($next).slideUp().parent().removeClass('open');
            }
          };

          var accordion = new Accordion2($('ul.accordion'), false);
          accordionActive = true;
        }
      }
    }
    else {
      if ($sideMenu.hasClass("active")) {
        $sideMenu.removeClass('active');
        $topMenu.addClass('active');

        var $ddl = $('#side-menu .movable.nav-header');
        $ddl.detach();
        $ddl.removeClass('nav-header');
        $ddl.addClass('dropdown');

        $ddl.find('.link').removeClass('link').addClass('dropdown-toggle');
        $ddl.find('.submenu').removeClass('submenu').addClass('dropdown-menu');

        $('#side-menu #qform').detach().addClass('navbar-form').appendTo($topMenu.find('.nav'));
        $ddl.appendTo($topMenu.find('.nav'));
      }
    }
  });

  /**/
  var $menulink = $('.side-menu-link'),
    $wrap = $('.wrap');

  $menulink.click(function() {
    $menulink.toggleClass('active');
    $wrap.toggleClass('active');
    return false;
  });

  /*Accordion*/
  var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find('.link');
    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
  };

  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el;
    $this = $(this),
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
    }
  };

  var accordion = new Accordion($('ul.accordion'), false);
});


$(function() {
  $('a').each(function() {
    if ($(this).prop('href') === window.location.href) {
      $(this).removeClass('navlink');
      $(this).addClass('currentlink');
    }
  });
});

/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
var getQueryString = function(field, url) {
  var href = url ? url : window.location.href;
  var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
  var string = reg.exec(href);
  return string ? string[1] : null;
};

/**
 * Disable / Re-enable a form submittable element
 * Use this instead of the HTML5 disabled prop
 * @param selector  String|jQuery Object    The selector for elem
 * @param disable   Boolean   Whether to disable or re-enable
 */
function toggleElemDisabled(selector, disable) {
  var select_elem = null;
  if (typeof selector === 'string' || selector instanceof String) {
    select_elem = $(selector);
  }
  else if (selector instanceof jQuery) {
    select_elem = selector;
  }
  else {
    console.err("toggleElemDisabled(): invalid selector argument");
    return;
  }
  if (disable) {
    select_elem.parent().css({
      'cursor': 'not-allowed'
    });
    select_elem.css({
      'background-color': '#EEEEEE',
      'opacity': '0.7',
      'pointer-events': 'none'
    });
    select_elem.prop('readonly', true);
    select_elem.prop('tabindex', -1);
  }
  else {
    select_elem.parent().removeAttr('style');
    select_elem.removeAttr('style');
    select_elem.prop('readonly', false);
    select_elem.prop('tabindex', 0);
  }
}

/**
 * Recursively search DOM tree until test is true
 * Starts at and includes selected node, tests each desc
 * Note that test callback applies to jQuery objects throughout
 * @param selector   String|jQuery Object  The selector for start node
 * @param test       function()            Test to apply to each node
 * @return           jQuery Object|null    Returns found node or null
 */
function descendingSearch(selector, test) {
  var select_node = null;
  if (typeof selector === 'string' || selector instanceof String) {
    select_node = $(selector);
  }
  else if (selector instanceof jQuery) {
    select_node = selector;
  }
  else {
    return null;
  }

  var num_nodes = select_node.length || 0;
  if (num_nodes > 1) {
    for (var i = 0; i < num_nodes; i++) {
        if (test(select_node[i])) {
          return select_node[i];
      }
    }
  }
  else {
    if (test(select_node)) {
        return select_node;
      }
  }

  node_list = select_node.children();
  if (node_list.length <= 0) {
    return null;
  }

  descendingSearch(node_list, test)
}

$('#open-CarrierAdd').click(function() {
  var modal = $('#add');
  modal.css('z-index','1070');
});



$('#pbxs #open-Delete').click(function() {
  var row_index = $(this).parent().parent().parent().index() + 1;
  var c = document.getElementById('endpointgroups');
  var gwid = $(c).find('tr:eq(' + row_index + ') td:eq(2)').text();
  var name = $(c).find('tr:eq(' + row_index + ') td:eq(3)').text();

$('#edit').on('show.bs.modal', function() {

  //console.log("The current endpointgroup is " + gwgroupid);
  // Show the auth tab by default when the modal shows
  var modal_body = $('#edit .modal-body');
  modal_body.find("[name='auth-toggle']").trigger('click');

  // Put into JSON Message and send over

  $.ajax({
		type: "GET",
		url: "/api/v1/endpointgroups/" + gwgroupid,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(msg) {
      displayEndpointGroup(msg)
		}
  })
});

// Updates the modal with the values from the endpointgroup API

function displayEndpointGroup(msg)
{
  clearEndpointGroupModal();

  var modal_body = $('#edit .modal-body');
  modal_body.find(".name").val(msg.name);
  modal_body.find(".gwgroupid").val(msg.gwgroupid);
  modal_body.find(".calllimit").val(msg.calllimit);

  modal_body.find(".authtype").val(msg.auth.type);
  modal_body.find(".auth_username").val(msg.auth.user);
  modal_body.find(".auth_password").val(msg.auth.pass);
  modal_body.find(".auth_domain").val(msg.auth.domain);

  modal_body.find(".strip").val(msg.strip);
  modal_body.find(".prefix").val(msg.prefix);

  modal_body.find(".email_over_max_calls").val(msg.notifications.overmaxcalllimit);
  modal_body.find(".email_endpoint_failure").val(msg.notifications.endpointfailure);

  modal_body.find(".fusionpbx_db_enabled").val(msg.fusionpbx.enabled);
  modal_body.find(".fusionpbx_db_server").val(msg.fusionpbx.dbhost);
  modal_body.find(".fusionpbx_db_username").val(msg.fusionpbx.dbuser);
  modal_body.find(".fusionpbx_db_password").val(msg.fusionpbx.dbpass);

  if (msg.endpoints) {

    var table = $('#endpoint-table');
    var body = $('#endpoint-tablebody');

    for (endpoint in msg.endpoints) {
      row = '<tr class="endpoint"><td name="pbxid">' + msg.endpoints[endpoint].pbxid + '</td>'
      row += '<td name="hostname">' + msg.endpoints[endpoint].hostname +'</td>'
      row += '<td name="description">' + msg.endpoints[endpoint].description + '</td></tr>'
      table.append($(row));
    }

    table.data('Tabledit').reload();

  }

  if (msg.fusionpbx.enabled) {
      modal_body.find(".toggleFusionPBXDomain").bootstrapToggle('on');
  }
  else {
      modal_body.find(".toggleFusionPBXDomain").bootstrapToggle('off');
  }


  if (msg.auth.type == "userpwd") {
    /* userpwd auth enabled, Set the radio button to true */
    modal_body.find('.authtype[data-toggle="userpwd_enabled"]').trigger('click');
  }
  else {
    /* ip auth enabled, Set the radio button to true */
    modal_body.find('.authtype[data-toggle="ip_enabled"]').trigger('click');
  }


}

function deleteEndpointGroup() {

  $.ajax({
		type: "DELETE",
		url: "/api/v1/endpointgroups/" + gwgroupid,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(msg) {


        reloadkamrequired();
		}

  })


  $('#delete').modal('hide');
  $('#edit').modal('hide');
  $('#endpointgroups').DataTable().ajax.reload();
}





$('#domains #open-Update').click(function() {
  var row_index = $(this).parent().parent().parent().index() + 1;
  var c = document.getElementById('domains');
  var domain_id = $(c).find('tr:eq(' + row_index + ') td:eq(1)').text();
  var domain_name = $(c).find('tr:eq(' + row_index + ') td:eq(2)').text();
  var domain_type = $(c).find('tr:eq(' + row_index + ') td:eq(3)').text();
  var pbx_name = $(c).find('tr:eq(' + row_index + ') td:eq(4)').text();
  var authtype = $(c).find('tr:eq(' + row_index + ') td:eq(5)').text();
  var pbx_list = $(c).find('tr:eq(' + row_index + ') td:eq(6)').text();
  var notes = $(c).find('tr:eq(' + row_index + ') td:eq(7)').text();


  /** Clear out the modal */
  var modal_body = $('#edit .modal-body');
  modal_body.find(".domain_id").val('');
  modal_body.find(".domain_name").val('');
  modal_body.find(".domain_type").val('');
  modal_body.find(".pbx_name").val('');
  modal_body.find(".pbx_list").val('');
  modal_body.find(".notes").val('');

  /* update modal fields */
  modal_body.find(".domain_id").val(domain_id);
  modal_body.find(".domain_name").val(domain_name);
  modal_body.find(".domain_type").val(domain_type);
  modal_body.find(".pbx_name").val(pbx_name);
  modal_body.find(".pbx_list").val(pbx_list);
  modal_body.find(".notes").val(notes);

  if (authtype !== "") {
    /* Set the radio button if authtype is given */
    modal_body.find('.authtype[data-toggle="' + authtype + '"]').trigger('click');
  }
});

$('#domains #open-Delete').click(function() {
  var row_index = $(this).parent().parent().parent().index() + 1;
  var c = document.getElementById('domains');
  var domain_id = $(c).find('tr:eq(' + row_index + ') td:eq(1)').text();
  var domain_name = $(c).find('tr:eq(' + row_index + ') td:eq(2)').text();

  /* update modal fields */
  var modal_body = $('#delete .modal-body');
  modal_body.find(".domain_id").val(domain_id);
  modal_body.find(".domain_name").val(domain_name);
});

$('#open-CarrierAdd').click(function() {
  /** Clear out the modal */
  var modal_body = $('#add .modal-body');
  modal_body.find("input").val('');
  modal_body.find('select').prop('selectedIndex', 0);
});

$('#inboundmapping #open-Update').click(function() {
  var row_index = $(this).parent().parent().parent().index() + 1;
  var c = document.getElementById('inboundmapping');
  var ruleid = $(c).find('tr:eq(' + row_index + ') td:eq(1)').text();
  var prefix = $(c).find('tr:eq(' + row_index + ') td:eq(2)').text();
  var gwgroupid = $(c).find('tr:eq(' + row_index + ') td:eq(3)').text();
  var rulename = $(c).find('tr:eq(' + row_index + ') td:eq(5)').text();
  var hf_ruleid = $(c).find('tr:eq(' + row_index + ') td:eq(9)').text();
  var hf_groupid = $(c).find('tr:eq(' + row_index + ') td:eq(10)').text();
  var hf_gwgroupid = $(c).find('tr:eq(' + row_index + ') td:eq(11)').text();
  var hf_fwddid = $(c).find('tr:eq(' + row_index + ') td:eq(12)').text();
  var ff_ruleid = $(c).find('tr:eq(' + row_index + ') td:eq(13)').text();
  var ff_groupid = $(c).find('tr:eq(' + row_index + ') td:eq(14)').text();
  var ff_gwgroupid = $(c).find('tr:eq(' + row_index + ') td:eq(15)').text();
  var ff_fwddid = $(c).find('tr:eq(' + row_index + ') td:eq(16)').text();

  /** Clear out the modal */
  var modal_body = $('#edit .modal-body');
  modal_body.find("input.ruleid").val('');
  modal_body.find("input.prefix").val('');
  modal_body.find("input.rulename").val('');
  modal_body.find("input.hf_ruleid").val('');
  modal_body.find("input.hf_groupid").val('');
  modal_body.find("input.hf_fwddid").val('');
  modal_body.find("input.ff_ruleid").val('');
  modal_body.find("input.ff_groupid").val('');
  modal_body.find("input.ff_fwddid").val('');

  /* update modal fields */
  modal_body.find("input.ruleid").val(ruleid);
  modal_body.find("input.prefix").val(prefix);
  modal_body.find("input.rulename").val(rulename);
  modal_body.find("input.hf_ruleid").val(hf_ruleid);
  modal_body.find("input.hf_groupid").val(hf_groupid);
  modal_body.find("input.hf_fwddid").val(hf_fwddid);
  modal_body.find("input.ff_ruleid").val(ff_ruleid);
  modal_body.find("input.ff_groupid").val(ff_groupid);
  modal_body.find("input.ff_fwddid").val(ff_fwddid);

  /* update options selected */
  var i = 0;
  var gwgroup_options = modal_body.find("select.gwgroupid > option").get();
  for (i = 0; i < gwgroup_options.length; i++) {
    if (gwgroupid === gwgroup_options[i].value) {
      $(gwgroup_options[i]).attr('selected', true);
      break;
    }
  }
  var hf_gwgroup_options = modal_body.find("select.hf_gwgroupid > option").get();
  for (i = 0; i < hf_gwgroup_options.length; i++) {
    if (hf_gwgroupid === hf_gwgroup_options[i].value) {
      $(hf_gwgroup_options[i]).attr('selected', true);
      break;
    }
  }
  var ff_gwgroup_options = modal_body.find("select.ff_gwgroupid > option").get();
  for (i = 0; i < ff_gwgroup_options.length; i++) {
    if (ff_gwgroupid === ff_gwgroup_options[i].value) {
      $(ff_gwgroup_options[i]).attr('selected', true);
      break;
    }
  }

  /* update toggle buttons */
  if (modal_body.find("input.hardfwd_enabled").val()) {
    modal_body.find(".toggle-hardfwd").bootstrapToggle('on');
  }
  else {
    modal_body.find(".toggle-hardfwd").bootstrapToggle('off');
  }
  if (modal_body.find("input.failfwd_enabled").val()) {
    modal_body.find(".toggle-failfwd").bootstrapToggle('on');
  }
  else {
    modal_body.find(".toggle-failfwd").bootstrapToggle('off');
  }
});

$('#inboundmapping #open-Delete').click(function() {
  var row_index = $(this).parent().parent().parent().index() + 1;
  var c = document.getElementById('inboundmapping');
  var ruleid = $(c).find('tr:eq(' + row_index + ') td:eq(1)').text();
  var prefix = $(c).find('tr:eq(' + row_index + ') td:eq(2)').text();
  var hf_ruleid = $(c).find('tr:eq(' + row_index + ') td:eq(9)').text();
  var ff_ruleid = $(c).find('tr:eq(' + row_index + ') td:eq(13)').text();

  /* update modal fields */
  var modal_body = $('#delete .modal-body');
  modal_body.find("input.ruleid").val(ruleid);
  modal_body.find("input.prefix").val(prefix);
  modal_body.find("input.hf_ruleid").val(hf_ruleid);
  modal_body.find("input.ff_ruleid").val(ff_ruleid);
});

$('#outboundmapping #open-Update').click(function() {
  var row_index = $(this).parent().parent().parent().index() + 1;
  var c = document.getElementById('outboundmapping');

  var ruleid = $(c).find('tr:eq(' + row_index + ') > td.ruleid').text();
  var groupid = $(c).find('tr:eq(' + row_index + ') > td.groupid').text();
  var prefix = $(c).find('tr:eq(' + row_index + ') > td.prefix').text();
  var from_prefix = $(c).find('tr:eq(' + row_index + ') > td.from_prefix').text();
  var timerec = $(c).find('tr:eq(' + row_index + ') > td.timerec').text();
  var priority = $(c).find('tr:eq(' + row_index + ') > td.priority').text();
  var routeid = $(c).find('tr:eq(' + row_index + ') > td.routeid').text();
  var gwlist = $(c).find('tr:eq(' + row_index + ') > td.gwlist').text();
  var name = $(c).find('tr:eq(' + row_index + ') > td.description').text();

  /** Clear out the modal */
  var modal_body = $('#edit .modal-body');
  modal_body.find(".ruleid").val('');
  modal_body.find(".groupid").val('');
  modal_body.find(".prefix").val('');
  modal_body.find(".from_prefix").val('');
  modal_body.find(".timerec").val('');
  modal_body.find(".priority").val('');
  modal_body.find(".routeid").val('');
  modal_body.find(".gwlist").val('');
  modal_body.find(".name").val('');

  /* update modal fields */
  modal_body.find(".ruleid").val(ruleid);
  modal_body.find(".groupid").val(groupid);
  modal_body.find(".prefix").val(prefix);
  modal_body.find(".from_prefix").val(from_prefix);
  modal_body.find(".timerec").val(timerec);
  modal_body.find(".priority").val(priority);
  modal_body.find(".routeid").val(routeid);
  modal_body.find(".gwlist").val(gwlist);
  modal_body.find(".name").val(name);
});

$('#outboundmapping #open-Delete').click(function() {
  var row_index = $(this).parent().parent().parent().index() + 1;
  var c = document.getElementById('outboundmapping');
  var ruleid = $(c).find('tr:eq(' + row_index + ') td:eq(1)').text();

  /* update modal fields */
  var modal_body = $('#delete .modal-body');
  modal_body.find(".ruleid").val(ruleid);
});

function reloadkamrequired() {
  var reload_button = $('#reloadkam');

  reload_button.removeClass('btn-primary');
  reload_button.addClass('btn-warning');


}

function reloadkam(elmnt) {
  //elmnt.style.backgroundColor = "red";
  //elmnt.style.borderColor = "red"
  var msg_bar = $(".message-bar");
  var reload_button = $('#reloadkam');


  $.ajax({
    type: "GET",
    url: "/reloadkam",
    dataType: "json",
    success: function(msg) {
      if (msg.status === 1) {
        msg_bar.addClass("alert alert-success");
        msg_bar.html("<strong>Success!</strong> Kamailio was reloaded successfully!");
        reload_button.removeClass('btn-warning');
        reload_button.addClass('btn-primary');
      }
      else {
        msg_bar.addClass("alert alert-danger");
        msg_bar.html("<strong>Failed!</strong> Kamailio was NOT reloaded successfully!");
      }

      msg_bar.show();
      msg_bar.slideUp(3000, "linear");
      //elmnt.style.backgroundColor = "#337ab7";
      //elmnt.style.borderColor = "#2e6da4";
    }
  });
}

function enableMaintenanceMode() {

	var table=document.getElementById("pbxs");
	r=1;
	while(row=table.rows[r++]) {
	    checkbox=row.cells[0].getElementsByClassName('checkthis');
	    if (checkbox[0].checked) {
		    updateEndpoint(row,'maintmode',1);
	    }
	}

}

$('#open-EndpointGroupsAdd').click(function() {

  clearEndpointGroupModal();

})



function clearEndpointGroupModal() {

    /** Clear out the modal */

  var modal_body = $('#add .modal-body');
  modal_body.find(".gwgroupid").val('');
  modal_body.find(".name").val('');
  modal_body.find(".ip_addr").val('');
  modal_body.find(".strip").val('');
  modal_body.find(".prefix").val('');
  modal_body.find(".fusionpbx_db_server").val('');
  modal_body.find(".fusionpbx_db_username").val('fusionpbx');
  modal_body.find(".fusionpbx_db_password").val('');
  modal_body.find(".authtype").val('ip');
  modal_body.find(".auth_username").val('');
  modal_body.find(".auth_password").val('');
  modal_body.find(".auth_domain").val('');
  modal_body.find(".calllimit").val('');
  modal_body.find(".email_over_max_calls").val('');
  modal_body.find(".email_endpoint_failure").val('');
  modal_body.find('.FusionPBXDomainOptions').addClass("hidden");

  // Remove Endpont Rows
  $("tr.endpoint").each(function (i, row) {
      $(this).remove();
  })

  // Make the Auth tab the default
  modal_body.find(".auth-tab").addClass("active");


  /* make sure ip_addr not disabled */
  toggleElemDisabled(modal_body.find('.ip_addr'), false);

}


function addEndpointGroup(action) {

  /** Get data from the modal */


  // The default action is a POST (creating a new EndpointGroup)
  if (action == undefined) {
    action = "POST"
    selector = "#add"
    var modal_body = $(selector + ' .modal-body');
    url = "/api/v1/endpointgroups"
  }

  if (action == "PUT") {
      selector = "#edit"
      // Grab the Gateway Group ID if updating usinga PUT
      var modal_body = $(selector + ' .modal-body');
      gwgroupid = modal_body.find(".gwgroupid").val();
      url = "/api/v1/endpointgroups/" + gwgroupid
  }


  var requestPayload = new Object();

  requestPayload.name = modal_body.find(".name").val();
  requestPayload.calllimit = modal_body.find(".calllimit").val();

  auth = new Object();

  auth.type = modal_body.find(".authtype").val();
  auth.user = modal_body.find(".auth_username").val();
  auth.pass = modal_body.find(".auth_password").val();
  auth.domain = modal_body.find(".auth_domain").val();

  requestPayload.auth = auth;

  requestPayload.strip= modal_body.find(".strip").val();
  requestPayload.prefix = modal_body.find(".prefix").val();

  notifications = new Object()

  notifications.overmaxcalllimit = modal_body.find(".email_over_max_calls").val();
  notifications.endpointfailure = modal_body.find(".email_endpoint_failure").val();

  requestPayload.notifications = notifications

  fusionpbx = new Object()

  fusionpbx.enabled = modal_body.find(".fusionpbx_db_enabled").val();
  fusionpbx.dbhost = modal_body.find(".fusionpbx_db_server").val();
  fusionpbx.dbuser = modal_body.find(".fusionpbx_db_username").val();
  fusionpbx.dbpass = modal_body.find(".fusionpbx_db_password").val();

  requestPayload.fusionpbx = fusionpbx;


  /* Process endpoints */

  endpoints = new Array();

  $("tr.endpoint").each(function (i, row) {

    endpoint = new Object();
    endpoint.pbxid = $(this).find('td').eq(0).text();
    endpoint.hostname = $(this).find('td').eq(1).text();
    endpoint.description = $(this).find('td').eq(2).text();
    //endpoint.maintmode = $(this).find('td').eq(3).text();

    endpoints.push(endpoint);
  });

   requestPayload.endpoints=endpoints;



// Put into JSON Message and send over

  $.ajax({
		type: action,
		url: url,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(msg) {
			if (msg.status == 200) {
        // Update the Add Button to say saved
        var btn=$('#add .modal-footer').find('#addButton');
        btn.removeClass("btn-primary");
        btn.addClass("btn-success");
        btn.html("<span class='glyphicon glyphicon-check'></span>Saved!");
				//Uncheck the Checkbox
					reloadkamrequired();
          $('#endpointgroups').DataTable().ajax.reload();
			}
			else {
        console.log("error during endpointgroup update");

			}

		},
		data: JSON.stringify(requestPayload)
  })
}


function updateEndpointGroup () {



  addEndpointGroup("PUT");


}


function disableMaintenanceMode() {

	var table=document.getElementById("pbxs");
	r=1;
	while(row=table.rows[r++]) {
	    checkbox=row.cells[0].getElementsByClassName('checkthis');
	    if (checkbox[0].checked) {
		    updateEndpoint(row,'maintmode',0);
	    }
	}

}

/* Update an attribute of an endpoint
/* row - Javascript DOM that contains the row of the PBX
 * attr - is the attribute that we want to update
 */
function updateEndpoint(row,attr,attrvalue) {

	checkbox=row.cells[0].getElementsByClassName('checkthis');
  pbxid = checkbox[0].value;
  requestPayload = '{"maintmode":' +  attrvalue + '}';

	$.ajax({
		type: "POST",
		url: "/api/v1/endpoint/" + pbxid,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(msg) {
			if (msg.status === 1) {
				//Uncheck the Checkbox
				if (attr === 'maintmode') {
				$('#checkbox_' + pbxid )[0].checked=false;
				if (attrvalue == 1) {
					$('#maintmode_' + pbxid ).html("<span class='glyphicon glyphicon-wrench'>");
					reloadkamrequired();
				}
				else {

					$('#maintmode_' + pbxid ).html("");
					reloadkamrequired();
				}
				}
			}

		},
		data: requestPayload

	});
}

/* listener for fusionPBX toggle */
$('.modal-body .toggleFusionPBXDomain').change(function() {
  var modal = $(this).closest('div.modal');
  var modal_body = modal.find('.modal-body');

  if ($(this).is(":checked") || $(this).prop("checked")) {
    modal_body.find('.FusionPBXDomainOptions').removeClass("hidden");
    modal_body.find('.fusionpbx_db_enabled').val(1);

    /* uncheck other toggles */
    //modal_body.find(".toggleFreePBXDomain").bootstrapToggle('off');
  }
  else {
    modal_body.find('.FusionPBXDomainOptions').addClass("hidden");
    modal_body.find('.fusionpbx_db_enabled').val(0);
  }
});

/* listener for freePBX toggle */
$('.modal-body .toggleFreePBXDomain').change(function() {
  var modal = $(this).closest('div.modal');
  var modal_body = modal.find('.modal-body');

  if ($(this).is(":checked") || $(this).prop("checked")) {
    modal_body.find('.FreePBXDomainOptions').removeClass("hidden");
    modal_body.find('.freepbx_enabled').val(1);

    /* uncheck other toggles */
    modal_body.find(".toggleFusionPBXDomain").bootstrapToggle('off');
  }
  else {
    modal_body.find('.FreePBXDomainOptions').addClass("hidden");
    modal_body.find('.freepbx_enabled').val(0);
  }
});

/* listener for teleblock toggle */
$('#toggleTeleblock').change(function() {
  if ($(this).is(":checked") || $(this).prop("checked")) {
    $('#teleblockOptions').removeClass("hidden");
    $(this).val("1");
    $(this).bootstrapToggle('on');
  }
  else {
    $('#teleblockOptions').addClass("hidden");
    $(this).val("0");
    $(this).bootstrapToggle('off');
  }
});

/* listener for hard forward toggle */
$('.modal-body .toggle-hardfwd').change(function() {
  var modal = $(this).closest('div.modal');
  var modal_body = modal.find('.modal-body');

  if ($(this).is(":checked") || $(this).prop("checked")) {
    modal_body.find('.hardfwd-options').removeClass("hidden");
    modal_body.find('.hardfwd_enabled').val(1);
    // modal_body.find('select.gwgroupid').prop('selectedIndex', 0);
    toggleElemDisabled(modal_body.find('select.gwgroupid'), true);
  }
  else {
    modal_body.find('.hardfwd-options').addClass("hidden");
    modal_body.find('.hardfwd_enabled').val(0);
    toggleElemDisabled(modal_body.find('select.gwgroupid'), false);
  }
});

/* listener for failover forward toggle */
$('.modal-body .toggle-failfwd').change(function() {
  var modal = $(this).closest('div.modal');
  var modal_body = modal.find('.modal-body');

  if ($(this).is(":checked") || $(this).prop("checked")) {
    modal_body.find('.failfwd-options').removeClass("hidden");
    modal_body.find('.failfwd_enabled').val(1);
  }
  else {
    modal_body.find('.failfwd-options').addClass("hidden");
    modal_body.find('.failfwd_enabled').val(0);
  }
});

/* listener for authtype radio buttons */
$('.authoptions.radio').get().forEach(function(elem) {
  elem.addEventListener('click', function(e) {
    var target_radio = $(e.target);
    /* keep descending down DOM tree until input hit */
    target_radio = descendingSearch($(e.target), function(node) {
      return node.get(0).nodeName.toLowerCase() === "input"
    });
    if (target_radio === null) {
      return false;
    }
    var auth_radios = $(e.currentTarget).find('input[type="radio"]');
    var modal_body = $(this).closest('.modal-body');
    var hide_show_ids = [];
    $.each(auth_radios, function() {
      hide_show_ids.push('#' + $(this).data('toggle'));
    });
    var hide_show_divs = modal_body.find(hide_show_ids.join(', '));

    if (target_radio.is(":checked") || target_radio.prop("checked")) {
      /* enable ip_addr on ip auth in #edit modal only */
      if ($(this).closest('div.modal').attr('id').toLowerCase().indexOf('edit') > -1) {
        if (target_radio.data('toggle') === "ip_enabled") {
          toggleElemDisabled(modal_body.find('input.ip_addr'), false);
        }
        else {
          toggleElemDisabled(modal_body.find('input.ip_addr'), true);
        }
      }

      /* change value of authtype inputs */
      modal_body.find('.authtype').val(target_radio.data('toggle').split('_')[0]);

      /* show correct div's */
      $.each(hide_show_divs, function(i, elem) {
        if (target_radio.data('toggle') === $(elem).attr('name')) {
          $(elem).removeClass("hidden");
        }
        else {
          $(elem).addClass("hidden");
        }
      });
    }
    else {
      /* change value of authtype inputs */
      modal_body.find('.authtype').val('');

      /* show correct div's */

      $.each(hide_show_divs, function(i, elem) {
        if (target_radio.data('toggle') === $(elem).attr('name')) {
          $(elem).addClass("hidden");
        }
        else {
          $(elem).removeClass("hidden");
        }
      });
    }
    /* trickle down DOM tree (capture event) */
  }, true);
});

/* handle multiple modal stacking */
$(window).on('show.bs.modal', function(e) {
  modal = $(e.target);
  zIndexTop = Math.max.apply(null, $('.modal').map(function() {
    var z = parseInt($(this).css('z-index'));
    return isNaN(z, 10) ? 0 : z;
  }));
  modal.css('z-index', zIndexTop + 10);
  modal.addClass('modal-open');
});
$(window).on('hide.bs.modal', function(e) {
  modal = $(e.target);
  modal.css('z-index', '1050');
});

/* remove non-printable ascii chars on paste */
$('form input[type!="hidden"]').on("paste", function() {
  $(this).val(this.value.replace(/[^\x20-\x7E]+/g, ''))
});

/* make sure autofocus is honored on loaded modals */
$('.modal').on('shown.bs.modal', function() {
  $(this).find('[autofocus]').focus();
});
