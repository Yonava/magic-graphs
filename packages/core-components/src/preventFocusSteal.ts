/**
 * the default action of mousedown is to move DOM focus to the element under the
 * cursor. these components sit on top of a canvas that owns the keyboard, so
 * they suppress that: a button acts on the graph without ever taking focus off
 * the canvas, which keeps shortcuts live and stops space from re-triggering the
 * last button pressed.
 *
 * only mouse-driven focus is affected. tab order, programmatic .focus(), keyboard
 * activation and focus-visible rings all behave as before, so reka's roving focus
 * and focus restoration keep working and menu triggers still open on click.
 *
 * this is a deliberate blanket policy for every command button in the library,
 * matching how canvas apps like excalidraw treat their toolbars. anything that
 * genuinely needs click focus, a text field or a control inside a modal flow,
 * should not be built on these components.
 */
export const preventFocusSteal = (event: MouseEvent) => event.preventDefault();
