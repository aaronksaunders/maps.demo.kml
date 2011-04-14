// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({
    font:{fontSize:6,fontFamily:'Helvetica Neue',fontColor:'#444'},
    color:'#444'
});

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({
    url: 'view/foo.js',
    title:'Tab 1',
    font:{fontSize:10,fontFamily:'Helvetica Neue',color:'#999'},
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    font:{fontSize:10,fontFamily:'Helvetica Neue',color:'#999'},
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
    color:'#999',
    text:'I am Window 1',
    font:{fontSize:20,fontFamily:'Helvetica Neue'},
    textAlign:'center',
    width:'auto'
});


var picker = Ti.UI.createPicker();

var data = [];
data[0]=Ti.UI.createPickerRow({title:'Bananas',custom_item:'b'});
data[1]=Ti.UI.createPickerRow({title:'Strawberries',custom_item:'s'});
data[2]=Ti.UI.createPickerRow({title:'Mangos',custom_item:'m'});
data[3]=Ti.UI.createPickerRow({title:'Grapes',custom_item:'g'});


for (var i in data) {
  Titanium.API.info(i);
  Titanium.API.info(data[i]);
  }

// turn on the selection indicator (off by default)
picker.selectionIndicator = true;

picker.add(data);

win1.add(picker);




var house_camera = Titanium.UI.createButton({title:"house_camera",style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED});
var camera = Titanium.UI.createButton({title:"camera",style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED});
var flexSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

house_camera.badge = 2;

var toolBar = Ti.UI.createToolbar({
    items:[house_camera,camera,camera],
    color:'999',
    height:40,
    bottom:-60

});
win1.add(toolBar);

win1.addEventListener('click', function(e) {

    Titanium.API.info("--> " + toolBar.bottom);
    if (toolBar.up == undefined) {
        toolBar.animate({bottom:0});
        toolBar.up = true;
    } else {
        toolBar.animate({bottom:-60});
        toolBar.up = undefined;
    }
});
//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({
    title:'Tab 2',
    color:'#444',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    window:win2
});
var win3 = Titanium.UI.createWindow({
    title:'Tab 3',
    color:'#444',
    backgroundColor:'#fff'
});

var label2 = Titanium.UI.createLabel({
    color:'#222',
    text:'I am Window 2',
    font:{fontSize:20,fontFamily:'Helvetica Neue'},
    textAlign:'center',
    width:'auto'
});

var titleLabel = Titanium.UI.createLabel({
    color:'#000',
    height:18,
    width:210,
    top:10,
    text:'A Trebuchet TItle',
    textAlign:'center',
    font:{fontFamily:'Trebuchet MS',fontSize:10,fontWeight:'bold'},
    shadowColor:'#eee',shadowOffset:{x:0,y:1}
});
win2.setTitleControl(titleLabel);

var webview1 = Titanium.UI.createWebView({url: 'index.html'});

win2.add(webview1);
//win1.hideNavBar();

var b1 = Titanium.UI.createButton({
    title:'Close',
    style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});

var b1_t = Titanium.UI.createButton({
    title:'Close_',
    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
    width:60,
    left:10
});

var b2_t = Titanium.UI.createButton({
    title:'Open_',
    style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
    width:60,
    left: 80
});

var b3_t = Titanium.UI.createButton({
    title:'Three',
    style:Titanium.UI.iPhone.SystemButtonStyle.DONE,
    width:60,
    left: 150
});

//https://appcelerator.lighthouseapp.com/projects/32238/tickets/1164-ability-to-add-multiple-buttons-to-navbar

var b2 = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var b3 = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.PLAIN,
    height:20
});

var titleView = Titanium.UI.createView({
    width:260,
    height:30,
    top:10
});

titleView.add(b1_t);
titleView.add(b2_t);
titleView.add(b3_t);
//titleView.add(b2);
win1.setTitleControl(titleView);

win1.setLeftNavButton(b1);

b1.addEventListener('click', function(e) {
    Titanium.API.info("--> " + e.source.title);
    if (e.source.title == "Edit") {
        // do edit stuff
        tableview.editing = true;
        e.source.title = "Done";
    } else {
        // switch out of edit mode stuff
        tableview.editing = false;
        e.source.title = "Edit";
    }
});

win2.add(label2);

//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

// open tab group
tabGroup.open();

Titanium.UI.iPhone.appBadge=Titanium.UI.iPhone.appBadge+1;

/**
 * @param na
 */
Ti.App.addEventListener('fromwebview', function(data) {
    Titanium.API.info("--> " + data.name);
});
function addContacts( ) {

    var contact = Titanium.Contacts.createPerson();
    contact.firstName = 'Aaron';
    contact.lastName = 'Saunders';

    var address = {};
    address.Street = '1 Union Station';
    address.City = 'Washington';
    address.State = 'DC';
    address.ZIP = '20011';

    var work_address = {};
    work_address.Street = '1 Columbia Drive';
    work_address.City = 'Columbia';
    work_address.State = 'MD';
    work_address.ZIP = '21044';

    contact.address = {"home":[address], "work":[work_address]};
    contact.email = {"home": ["test@gmail.com"], "work": ["test_work@gmail.com"]};
    contact.phone  = {"home": ["202.555.1212"],"work": ["202.555.0000"]};

    Titanium.Contacts.save();

}
