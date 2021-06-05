defmodule PlaygroundWeb.Components.Shapes.ElixirOnly do
  @moduledoc "Use Elixir to generate dynamic styles"

  use Surface.LiveComponent

  alias Surface.Components.Form
  alias Surface.Components.Form.Field
  alias Surface.Components.Form.Label
  alias Surface.Components.Form.RangeInput

  data min, :integer, default: 0
  data max, :integer, default: 250
  data x_axis, :integer, default: 0
  data y_axis, :integer, default: 0
  data style, :list, default: [left: "0px", top: "0px"]

  def handle_event("change_position", %{"style" => %{"x_axis" => x, "y_axis" => y}}, socket) do
    style = [left: x <> "px", top: y <> "px"]

    {:noreply,
     assign(socket, style: style, x_axis: String.to_integer(x), y_axis: String.to_integer(y))}
  end
end
