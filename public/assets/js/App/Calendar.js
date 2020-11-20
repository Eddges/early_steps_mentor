(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("/App/Calendar", ["exports", "Site", "Config"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("Site"), require("Config"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Site, global.Config);
    global.AppCalendar = mod.exports;
  }
})(this, function (_exports, _Site2, _Config) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.getInstance = getInstance;
  _exports.AppCalendar = _exports.default = void 0;
  _Site2 = babelHelpers.interopRequireDefault(_Site2);

  var AppCalendar =
  /*#__PURE__*/
  function (_Site) {
    babelHelpers.inherits(AppCalendar, _Site);

    function AppCalendar() {
      babelHelpers.classCallCheck(this, AppCalendar);
      return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(AppCalendar).apply(this, arguments));
    }

    babelHelpers.createClass(AppCalendar, [{
      key: "initialize",
      value: function initialize() {
        babelHelpers.get(babelHelpers.getPrototypeOf(AppCalendar.prototype), "initialize", this).call(this);
        this.$actionToggleBtn = $('.site-action-toggle');
        this.$addNewCalendarForm = $('#addNewCalendar').modal({
          show: false
        });
      }
    }, {
      key: "process",
      value: function process() {
        babelHelpers.get(babelHelpers.getPrototypeOf(AppCalendar.prototype), "process", this).call(this);
        this.handleFullcalendar();
        this.handleSelective();
        this.handleAction();
        this.handleListItem();
        this.handleEventList();
      }
    }, {
      key: "handleFullcalendar",
      value: function handleFullcalendar() {
        var title1 = sessionStorage.getItem("stringDetail").split(";");
        title1.pop();
        var dateStart = sessionStorage.getItem("stringStart").split(";");
        dateStart.pop();
        var dateEnd = sessionStorage.getItem("stringEnd").split(";");
        dateEnd.pop();
        console.log(title1);
        console.log(dateStart);
        console.log(dateEnd);

        var myEvents = [];
        var newColor = ["cyan","blue","green","pink","red"]
        for(let i=0;i<title1.length;i++)
        {
          myEvents.push({
          title: `Topic: `+title1[i].split("~")[0] +","+` Details: `+title1[i].split("~")[1],
          start: dateStart[i],
          end: dateEnd[i],
          backgroundColor: (0, _Config.colors)(newColor[i%10], 600),
          borderColor: (0, _Config.colors)(newColor[i%10], 600)            
          })
        }
        console.log(myEvents)

        // var myEvents = [{
        //   title: `Topic: `+title1[0].split(",")[0] +","+` Mentor: `+title1[0].split(",")[1],
        //   start: dateStart[0],
        //   end: dateEnd[0],
        //   backgroundColor: (0, _Config.colors)('blue', 600),
        //   borderColor: (0, _Config.colors)('blue', 600)
        // },{
        //   title: `Topic: `+title1[1].split(",")[0] +","+` Mentor: `+title1[1].split(",")[1],
        //   start: dateStart[1],
        //   end: dateEnd[1],
        //   backgroundColor: (0, _Config.colors)('red', 600),
        //   borderColor: (0, _Config.colors)('red', 600)
        // },{
        //   title: `Topic: `+title1[2].split(",")[0] +","+` Mentor: `+title1[2].split(",")[1],
        //   start: dateStart[2],
        //   end: dateEnd[2],
        //   backgroundColor: (0, _Config.colors)('green', 600),
        //   borderColor: (0, _Config.colors)('green', 600)          
        // },{
        //   title: `Topic: `+title1[3].split(",")[0] +","+` Mentor: `+title1[3].split(",")[1],
        //   start: dateStart[3],
        //   end: dateEnd[3],
        //   backgroundColor: (0, _Config.colors)('pink', 600),
        //   borderColor: (0, _Config.colors)('pink', 600)          
        // },{
        //   title: `Topic: `+title1[0].split(",")[0] +","+` Mentor: `+title1[0].split(",")[1],
        //   start: dateStart[4],
        //   end: dateEnd[4],
        //   backgroundColor: (0, _Config.colors)('cyan', 600),
        //   borderColor: (0, _Config.colors)('cyan', 600)          
        // }];
        var myOptions = {
          header: {
            left: null,
            center: 'prev,title,next',
            right: 'month,agendaWeek,agendaDay'
          },
          defaultDate: new Date(),
          selectable: true,
          selectHelper: true,
          select: function select() {
           // $('#addNewEvent').modal('show');
          },
          editable: true,
          eventLimit: true,
          windowResize: function windowResize(view) {
            var width = $(window).outerWidth();
            var options = Object.assign({}, myOptions);
            options.events = view.calendar.clientEvents();
            options.aspectRatio = width < 667 ? 0.5 : 1.35;
            $('#calendar').fullCalendar('destroy');
            $('#calendar').fullCalendar(options);
          },
          eventClick: function eventClick(event) {
            var color = event.backgroundColor ? event.backgroundColor : (0, _Config.colors)('blue', 600);
            $('#editEname').val(event.title);

            if (event.start) {
              $('#editStarts').datepicker('update', event.start._d);
            } else {
              $('#editStarts').datepicker('update', '');
            }

            if (event.end) {
              $('#editEnds').datepicker('update', event.end._d);
            } else {
              $('#editEnds').datepicker('update', '');
            }

            $('#editColor [type=radio]').each(function () {
              var $this = $(this);

              var _value = $this.data('color').split('|');

              var value = (0, _Config.colors)(_value[0], _value[1]);

              if (value === color) {
                $this.prop('checked', true);
              } else {
                $this.prop('checked', false);
              }
            });
            $('#editNewEvent').modal('show').one('hidden.bs.modal', function (e) {
              event.title = $('#editEname').val();
              var color = $('#editColor [type=radio]:checked').data('color').split('|');
              color = (0, _Config.colors)(color[0], color[1]);
              event.backgroundColor = color;
              event.borderColor = color;
              event.start = new Date($('#editStarts').data('datepicker').getDate());
              event.end = new Date($('#editEnds').data('datepicker').getDate());
              $('#calendar').fullCalendar('updateEvent', event);
            });
          },
          eventDragStart: function eventDragStart() {
            $('.site-action').data('actionBtn').show();
          },
          eventDragStop: function eventDragStop() {
            $('.site-action').data('actionBtn').hide();
          },
          events: myEvents,
          droppable: true
        };

        var _options;

        var myOptionsMobile = Object.assign({}, myOptions);
        myOptionsMobile.aspectRatio = 0.5;
        _options = $(window).outerWidth() < 667 ? myOptionsMobile : myOptions;
        $('#editNewEvent').modal();
        $('#calendar').fullCalendar(_options);
      }
    }, {
      key: "handleSelective",
      value: function handleSelective() {
        var member = [{
          id: 'uid_1',
          name: 'Herman Beck',
          avatar: '../../../../global/portraits/1.jpg'
        }, {
          id: 'uid_2',
          name: 'Mary Adams',
          avatar: '../../../../global/portraits/2.jpg'
        }, {
          id: 'uid_3',
          name: 'Caleb Richards',
          avatar: '../../../../global/portraits/3.jpg'
        }, {
          id: 'uid_4',
          name: 'June Lane',
          avatar: '../../../../global/portraits/4.jpg'
        }];
        var items = [{
          id: 'uid_1',
          name: 'Herman Beck',
          avatar: '../../../../global/portraits/1.jpg'
        }, {
          id: 'uid_2',
          name: 'Caleb Richards',
          avatar: '../../../../global/portraits/2.jpg'
        }];
        $('.plugin-selective').selective({
          namespace: 'addMember',
          local: member,
          selected: items,
          buildFromHtml: false,
          tpl: {
            optionValue: function optionValue(data) {
              return data.id;
            },
            frame: function frame() {
              return "<div class=\"".concat(this.namespace, "\">\n          ").concat(this.options.tpl.items.call(this), "\n          <div class=\"").concat(this.namespace, "-trigger\">\n          ").concat(this.options.tpl.triggerButton.call(this), "\n          <div class=\"").concat(this.namespace, "-trigger-dropdown\">\n          ").concat(this.options.tpl.list.call(this), "\n          </div>\n          </div>\n          </div>");
            },
            triggerButton: function triggerButton() {
              return "<div class=\"".concat(this.namespace, "-trigger-button\"><i class=\"wb-plus\"></i></div>");
            },
            listItem: function listItem(data) {
              return "<li class=\"".concat(this.namespace, "-list-item\"><img class=\"avatar\" src=\"").concat(data.avatar, "\">").concat(data.name, "</li>");
            },
            item: function item(data) {
              return "<li class=\"".concat(this.namespace, "-item\"><img class=\"avatar\" src=\"").concat(data.avatar, "\" title=\"").concat(data.name, "\">").concat(this.options.tpl.itemRemove.call(this), "</li>");
            },
            itemRemove: function itemRemove() {
              return "<span class=\"".concat(this.namespace, "-remove\"><i class=\"wb-minus-circle\"></i></span>");
            },
            option: function option(data) {
              return "<option value=\"".concat(this.options.tpl.optionValue.call(this, data), "\">").concat(data.name, "</option>");
            }
          }
        });
      }
    }, {
      key: "handleAction",
      value: function handleAction() {
        var _this = this;

        this.$actionToggleBtn.on('click', function (e) {
          _this.$addNewCalendarForm.modal('show');

          e.stopPropagation();
        });
      }
    }, {
      key: "handleEventList",
      value: function handleEventList() {
        $('#addNewEventBtn').on('click', function () {
          $('#addNewEvent').modal('show');
        });
        $('.calendar-list .calendar-event').each(function () {
          var $this = $(this);
          var color = $this.data('color').split('-');
          $this.data('event', {
            title: $this.data('title'),
            stick: $this.data('stick'),
            backgroundColor: (0, _Config.colors)(color[0], color[1]),
            borderColor: (0, _Config.colors)(color[0], color[1])
          });
          $this.draggable({
            zIndex: 999,
            revert: true,
            revertDuration: 0,
            appendTo: '.page',
            helper: function helper() {
              return "<a class=\"fc-day-grid-event fc-event fc-start fc-end\" style=\"background-color:".concat((0, _Config.colors)(color[0], color[1]), ";border-color:").concat((0, _Config.colors)(color[0], color[1]), "\">\n          <div class=\"fc-content\">\n            <span class=\"fc-title\">").concat($this.data('title'), "</span>\n          </div>\n          </a>");
            }
          });
        });
      }
    }, {
      key: "handleListItem",
      value: function handleListItem() {
        this.$actionToggleBtn.on('click', function (e) {
          $('#addNewCalendar').modal('show');
          e.stopPropagation();
        });
        $(document).on('click', '[data-tag=list-delete]', function (e) {
          bootbox.dialog({
            message: 'Do you want to delete the calendar?',
            buttons: {
              success: {
                label: 'Delete',
                className: 'btn-danger',
                callback: function callback() {// $(e.target).closest('.list-group-item').remove();
                }
              }
            }
          });
        });
      }
    }]);
    return AppCalendar;
  }(_Site2.default);

  _exports.AppCalendar = AppCalendar;
  var instance = null;

  function getInstance() {
    if (!instance) {
      instance = new AppCalendar();
    }

    return instance;
  }

  function run() {
    var app = getInstance();
    app.run();
      // alert("Het");
      //    let course_id = "1234";
      //    axios.get(`http://3.136.20.160/getScheduleByCourseId/${course_id}`)
      //    .then(function(response) {
      //      console.log(response);
      //      var stringDetail = "";
      //      var stringStart = "";
      //      var stringEnd = "";

      //      for(let i=0;i<response.data.a.length;i++) {
      //        stringDetail+=response.data.a[i].schedule_details + ";";
      //        stringStart+=response.data.a[i].schedule_start + ";";
      //        stringEnd+=response.data.a[i].schedule_end + ";";
      //      }
      //      sessionStorage.setItem("stringDetail", stringDetail);
      //      sessionStorage.setItem("stringStart", stringStart);
      //      sessionStorage.setItem("stringEnd", stringEnd);
      //      console.log(stringDetail);
      //      console.log(stringStart);
      //      console.log(stringEnd);
           
      //    }).catch(function(error){
      //      console.log(error);
      //    });
  }

  var _default = AppCalendar;
  _exports.default = _default;
});