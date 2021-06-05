defmodule PlaygroundWeb.Components.Shapes.UsingHooks do
  @moduledoc "Use JS hooks"

  use Surface.LiveComponent

  alias Surface.Components.Form
  alias Surface.Components.Form.Field
  alias Surface.Components.Form.RangeInput

  data min_size, :integer, default: 100
  data max_size, :integer, default: 300
  data shape_size, :integer, default: 100

  def handle_event("change_size", %{"style" => %{"size" => size}}, socket) do
    size = String.to_integer(size)
    socket = push_event(socket, "change_size", %{size: size})
    {:noreply, assign(socket, :shape_size, size)}
  end
end
