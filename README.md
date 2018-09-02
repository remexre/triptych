# triptych

A three-panel viewer for technical presentations.
Displays a video (with the HTML5 `<video>` element), slides (via [reveal.js](https://revealjs.com/)), and a screencast (via [asciinema](https://asciinema.org/)).

## Synchronization Data File

triptych relies on a file to describe how to synchronize the video, slides, and screencast.
It should be a JSON document like the following:

```json
{ "screencast": { "offset": 12.34 // Seconds to wait after video start before
                                  // starting screencast
	            }
, "slides": { "keyframes": [ { "t": 0 // A pair of time after video start and
                             , "n": 1 // slide number.
							 }
                           , { "t": 1.23 // These pairs determine which slide
                             , "n": 2    // should be visible at a given time.
							 }
						   ]
			}
}
```
