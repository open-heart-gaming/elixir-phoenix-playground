defmodule PlaygroundWeb.Components.Shapes.DynamicClasses do
  @moduledoc "Assing dynamic CSS classes"

  use Surface.LiveComponent

  alias Surface.Components.Form
  alias Surface.Components.Form.Field
  alias Surface.Components.Form.RadioButton

  @colors [:green, :blue, :red]
  data shape_color, :atom, default: :green, values: @colors

  defp colors, do: @colors

  def handle_event("change_color", %{"style" => %{"color" => color}}, socket) do
    {:noreply, assign(socket, :shape_color, String.to_existing_atom(color))}
  end
end
