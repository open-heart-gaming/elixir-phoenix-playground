defmodule PlaygroundWeb.Live.Shapes.Home do
  @moduledoc """
  Add dynamic styling to geometrical shapes
  """
  use Surface.LiveView

  alias PlaygroundWeb.Components.Shapes.DynamicClasses, as: DynamicClassesComponent
  alias PlaygroundWeb.Components.Shapes.UsingHooks, as: UsingHooksComponent
  alias PlaygroundWeb.Components.Shapes.ElixirOnly, as: ElixirOnlyComponent
end
