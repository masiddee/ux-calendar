$(document).ready(function() {
    var cal = ics();
    var events_array = [
        {
            type: 'custom',
            title: 'Custom Event',
            start: '2016-03-21T13:00:00-04:00',
            end: '2016-03-21T17:00:00-04:00',
            desc: 'This is a Custom Event',
            location: 'San Francisco, CA'
        },
        {
            type: 'emails',
            title: 'List Email',
            start: '2016-03-05T13:00:00-04:00',
            //end: '2016-03-05T14:00:00-04:00',
            desc: 'This is a list email send. It has no end date or location.',
            //location: 'Alaska'
        },
        {
            type: 'social',
            title: 'Social Post',
            start: '2016-03-21T13:00:00-04:00',
            end: '2016-03-21T17:00:00-04:00',
            desc: 'Come sing happy birthday to your buddies',
            location: 'Indianapolis, IN'
        },
        {
            type: 'webinars',
            title: 'Webinar',
            start: '2016-03-10T20:00:00-04:00',
            end: '2016-03-10T22:00:00-04:00',
            desc: 'Please join our Webinar!',
            location: 'Atlanta, GA'
        },
        {
            type: 'eb-events',
            title: 'Eventbrite Event',
            start: '2016-03-11T10:30:00-04:00',
            end: '2016-03-11T18:00:00-04:00',
            desc: 'Have fun with Eventbrite!',
            location: 'New York, NY'
        }
    ];
    var calShare = '<h2>Share Marketing Calendar</h2><p>Please select the event types you would like to share.</p><form id="share_form"><label>Event Calendar Name</label><input type="text" placeholder="Optional Name" class="share-events-name"><br>';
    calShare += '<label class="radio-events"><input type="radio" name="event-type" value="all_events" checked="checked">All Events<br><span>Includes all events on the marketing calendar</span></label><br>';
    calShare += '<label class="radio-events"><input type="radio" name="event-type" value="select_events">Specific Events<br><span>Select specific event types</span></label><br>';
    calShare += '<div class="select_events_cont disable"><input type="checkbox" name="selected_events" value="custom"><span>Custom Events</span>';
    calShare += '<input type="checkbox" name="selected_events" value="emails"><span>Scheduled/Sent Emails</span>';
    calShare += '<input type="checkbox" name="selected_events" value="social"><span>Social Posts</span>';
    calShare += '<input type="checkbox" name="selected_events" value="webinars"><span>Webinar</span>';
    calShare += '<input type="checkbox" name="selected_events" value="eb-events"><span>Eventbrite Events</span>';
    calShare += '</div>';
    calShare += '<div class="form-actions"><a href="#" class="btn btn-success btn-large share-events">Share Calendar Events</a></div>';
    calShare += '</form>';
    
    // Show/hide the specific events checkboxes based on radio button selection
    $('#fc_share_calendar').on('change','input[name="event-type"]',function(){
        var t = $(this);
        
        if(t.val() == 'select_events'){
            t.parent().siblings('.select_events_cont').removeClass('disable');
        }else{
            t.parent().siblings('.select_events_cont').addClass('disable');
        }
    });

    // Initialize FullCalendar
    $('#calendar').fullCalendar({
        // Create custom buttons to be added to the calendar div
        customButtons: {
            shareButton: {
                text: 'Share Calendar',
                click: function(){
                    $('#fc_share_calendar').html(calShare);
                }
            },
            createButton: {
                text: '+ Create Event',
                click: function(){
                    // alert('Create a new event');
                }
            }
        },
        header: {
            left: 'prev,next today month,agendaWeek,agendaDay',
            center: 'title',
            right: 'createButton shareButton'
        },
        selectable: true,
        events: events_array,
        eventRender: function(event,element){
            element.attr('title', event.desc);
        }
    });
    
    function compileCal(eventsArr, fileName) {
        // Compile the .ics file
        for(var i=0; i < eventsArr.length; i++){
            cal.addEvent(eventsArr[i].title, eventsArr[i].desc, (!eventsArr[i].location) ? 'This event has no location' : eventsArr[i].location, eventsArr[i].start, (!eventsArr[i].end) ? '' : eventsArr[i].end);
        }
        
        // Download the .ics file
        cal.download(fileName);
    };
    
    $('#fc_share_calendar').on('click', 'form .share-events', function(e){
        e.preventDefault();
        
        // Grab the file name from the input textbox
        var calName = $('.share-events-name').val();
        
        // Check which radio button is selected
        if($('input[name="event-type"]:checked').val() == 'select_events'){
            var selectedEvents = [];
            $('input[name="selected_events"]:checked').each(function(){
                var t = $(this);
                $.each(events_array, function(index, value){
                    if(t.val() == events_array[index].type){
                        selectedEvents.push(value);
                    }
                });                                
            });
            // console.log(selectedEvents);
            compileCal(selectedEvents, calName);
        }else{
            compileCal(events_array, calName);
            // alert('hey');
        }
    });
});



